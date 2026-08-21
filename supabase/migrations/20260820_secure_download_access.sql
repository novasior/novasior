create table if not exists public.download_access (
  id bigint generated always as identity primary key,
  order_id bigint not null references public.orders(id) on delete cascade,
  product_id uuid not null references public.products(id),
  download_count integer not null default 0,
  expires_at timestamptz not null,
  created_at timestamptz not null default now(),
  unique (order_id, product_id)
);

create index if not exists download_access_order_product_idx
  on public.download_access(order_id, product_id);

alter table public.download_access enable row level security;

create or replace function public.consume_download(
  requested_order_id bigint,
  requested_product_id uuid,
  maximum_downloads integer default null
)
returns table (allowed boolean, remaining_downloads integer)
language plpgsql
security definer
set search_path = public
as $$
begin
  return query
  update public.download_access
  set download_count = download_count + 1
  where order_id = requested_order_id
    and product_id = requested_product_id
    and expires_at > now()
  returning true, null;

  if not found then
    return query select false, 0;
  end if;
end;
$$;

revoke all on function public.consume_download(bigint, uuid, integer) from public;
grant execute on function public.consume_download(bigint, uuid, integer) to service_role;