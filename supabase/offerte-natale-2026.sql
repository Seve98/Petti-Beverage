-- Vetrina offerte della home (lista cliente, novembre 2026).
-- Da eseguire una volta nel SQL Editor di Supabase.

alter table public.prodotti
  add column if not exists prezzo_offerta numeric(10,2),
  add column if not exists offerta_ordine smallint;

alter table public.prodotti
  drop constraint if exists prodotti_prezzo_offerta_positivo;
alter table public.prodotti
  add constraint prodotti_prezzo_offerta_positivo
  check (prezzo_offerta is null or prezzo_offerta > 0);

-- Ordine in vetrina = numerazione del foglio del cliente.
-- prezzo_offerta solo dove c'è un prezzo pieno più alto da barrare.
update public.prodotti set offerta_ordine = 1 where slug = 'rum-barcelo-imperial-cl70';
update public.prodotti set offerta_ordine = 2 where slug = 'champagne-cristal-cl75-astuccio';
update public.prodotti set offerta_ordine = 3 where slug = 'champagne-moet-imperial-magnum-lt-15';
update public.prodotti set offerta_ordine = 4 where slug = 'rum-diplomatico-mantuano-cl70';
update public.prodotti set offerta_ordine = 5, prezzo_offerta = 26.50 where slug = 'gin-mare-070';
update public.prodotti set offerta_ordine = 6, prezzo_offerta = 48.00 where slug = 'chmapgne-moet-ice-cl-75'; -- 50 → 48 il 12/11/2026
update public.prodotti set offerta_ordine = 7 where slug = 'rum-zacapa-23-solera-cl70';
update public.prodotti set offerta_ordine = 8 where slug = 'rum-diplomatico-reserva-exclusiva-confezione-2-bicchieri';
-- Aggiunti il 12/11/2026 (già applicati sul DB)
update public.prodotti set offerta_ordine = 9, prezzo_offerta = 33.50 where slug = 'champagne-moet-e-chandon-cl70';
update public.prodotti set offerta_ordine = 10, prezzo = 31.00 where slug = 'rum-diplomatico-reserva-exclusiva-07';
-- 12/11/2026: Mantuano 32 a listino, 25 in offerta (già applicato)
update public.prodotti set prezzo = 32.00, prezzo_offerta = 25.00 where slug = 'rum-diplomatico-mantuano-cl70';

-- Controllo: devono uscire 10 righe
select offerta_ordine, nome, prezzo, prezzo_offerta
from public.prodotti
where offerta_ordine is not null
order by offerta_ordine;

-- Fine offerte:
-- update public.prodotti set offerta_ordine = null, prezzo_offerta = null where offerta_ordine is not null;
