// =====================================================================
// TESTE DE API NO CONSOLE DO NAVEGADOR
// Cole este código no Console (F12) quando estiver no Dashboard
// =====================================================================

// Teste 1: Verificar dados do Supabase direto
const testarChupinguaia = async () => {
  const { createClient } = window.supabase || supabase;
  const supabaseClient = createClient(
    'https://csuzmlajnhfauxqgczmu.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNzdXptbGFqbmhmYXV4cWdjem11Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE0NTA5NTUsImV4cCI6MjA0NzAyNjk1NX0.k6vAFmx3DfhfCtRqhh1Kb8wRE5BUhP0NxY-O45A8XhI'
  );

  console.log('=== TESTE: Buscando Chupinguaia ===');
  
  const { data, error } = await supabaseClient
    .from('municipios')
    .select(`
      *,
      paineis_bi (
        id,
        titulo,
        url_powerbi,
        status
      )
    `)
    .eq('nome', 'Chupinguaia')
    .single();

  if (error) {
    console.error('❌ Erro:', error);
  } else {
    console.log('✅ Dados de Chupinguaia:', data);
    console.log('📊 Painéis:', data.paineis_bi);
    console.log('🔍 Tem painel?', data.paineis_bi && data.paineis_bi.length > 0);
  }
  
  return data;
};

// Execute:
testarChupinguaia();
