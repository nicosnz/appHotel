using Microsoft.CodeAnalysis.CSharp;
using CodeSmellAnalyzer.Analyzers;
using CodeSmellAnalyzer.Models;

var rutaBackend = args.Length > 0 ? args[0] : Path.Combine("..", "backend");

if (!Directory.Exists(rutaBackend))
{
    Console.WriteLine($"No se encontró el directorio: {Path.GetFullPath(rutaBackend)}");
    Console.WriteLine("Uso: dotnet run [ruta-al-backend]");
    return;
}

var rutaServices = Path.Combine(rutaBackend, "Services");
var archivosCs = Directory.GetFiles(rutaServices, "*.cs", SearchOption.AllDirectories)
    .Where(f => !f.Contains($"{Path.DirectorySeparatorChar}obj{Path.DirectorySeparatorChar}"))
    .ToList();

Console.WriteLine($"Analizando {archivosCs.Count} archivos en {Path.GetFullPath(rutaBackend)}...\n");

var archivosConArboles = archivosCs
    .Select(ruta => (arbol: CSharpSyntaxTree.ParseText(File.ReadAllText(ruta)), ruta))
    .ToList();

var analizadores = new List<IAnalizador>
{
    new MetodoLargoAnalyzer(),
    new ClaseLargaAnalyzer(),
    new DemasiadosParametrosAnalyzer(),
    new NumeroMagicoAnalyzer(),
    new CodigoMuertoAnalyzer(),
    new DiosClaseAnalyzer(),
};

var todosLosResultados = new List<CodeSmell>();

foreach (var (arbol, ruta) in archivosConArboles)
    foreach (var analizador in analizadores)
        todosLosResultados.AddRange(analizador.Analizar(arbol, ruta));

todosLosResultados.AddRange(new CodigoDuplicadoAnalyzer().Analizar(archivosConArboles));

if (todosLosResultados.Count == 0)
{
    Console.WriteLine("No se encontraron code smells.");
    return;
}

foreach (var grupo in todosLosResultados.GroupBy(r => r.Tipo).OrderBy(g => g.Key))
{
    Console.ForegroundColor = ConsoleColor.Yellow;
    Console.WriteLine($"=== {grupo.Key} ({grupo.Count()} ocurrencias) ===");
    Console.ResetColor();

    foreach (var smell in grupo.OrderBy(s => s.Archivo).ThenBy(s => s.Linea))
    {
        var archivoRelativo = Path.GetRelativePath(rutaBackend, smell.Archivo);
        Console.WriteLine($"  Línea {smell.Linea,4} | {archivoRelativo}");
        Console.WriteLine($"           → {smell.Descripcion}");
    }

    Console.WriteLine();
}

Console.ForegroundColor = ConsoleColor.Cyan;
Console.WriteLine($"Total: {todosLosResultados.Count} code smell(s) encontrado(s).");
Console.ResetColor();
