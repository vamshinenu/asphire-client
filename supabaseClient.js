
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://nfnldkpvhvuvzqzrtjpy.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5mbmxka3B2aHZ1dnpxenJ0anB5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODYwODc5NjksImV4cCI6MjAwMTY2Mzk2OX0.pCg_-hYJj7xG6VR1H4KDdd8VmkE1md9t4_oZMIesNF0"
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;