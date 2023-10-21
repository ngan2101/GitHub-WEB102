import { createClient } from '@supabase/supabase-js'


const URL = 'https://fvfxwrjtkbxhlbhutmsi.supabase.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ2Znh3cmp0a2J4aGxiaHV0bXNpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njg5MDg4OTcsImV4cCI6MTk4NDQ4NDg5N30.zHuTPrBldtnwcHG5w0yWN6Nk1Qs5ZJnpT4d9v97tAyM';


export const supabase = createClient(URL, API_KEY);