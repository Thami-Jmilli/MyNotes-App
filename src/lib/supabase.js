import { createClient } from '@supabase/supabase-js';

const supabaseUrl =
  'https://wgfnuxprgkufqtsdwedd.supabase.co';

const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndnZm51eHByZ2t1ZnF0c2R3ZWRkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkwNDAwMTMsImV4cCI6MjA5NDYxNjAxM30.BtKidS5mBYM0-LbIAwg7iBx6lXHICFOl2wpE8PWrQHI';

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
);