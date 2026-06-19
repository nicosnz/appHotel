using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using CodeSmellAnalyzer.Models;

namespace CodeSmellAnalyzer.Analyzers;

public class CodigoDuplicadoAnalyzer
{
    private const int MinimoLineas = 5;

    public List<CodeSmell> Analizar(List<(SyntaxTree arbol, string ruta)> archivos)
    {
        var resultados = new List<CodeSmell>();
        var metodos = new List<(string cuerpoNormalizado, string nombreMetodo, string ruta, int linea)>();

        foreach (var (arbol, ruta) in archivos)
        {
            foreach (var metodo in arbol.GetRoot().DescendantNodes().OfType<MethodDeclarationSyntax>())
            {
                if (metodo.Body == null) continue;

                var ubicacion = arbol.GetLineSpan(metodo.Span);
                var cantidadLineas = ubicacion.EndLinePosition.Line - ubicacion.StartLinePosition.Line;
                if (cantidadLineas < MinimoLineas) continue;

                var cuerpoNormalizado = NormalizarCuerpo(metodo.Body.ToString());
                metodos.Add((cuerpoNormalizado, metodo.Identifier.Text, ruta, ubicacion.StartLinePosition.Line + 1));
            }
        }

        var duplicados = metodos
            .GroupBy(m => m.cuerpoNormalizado)
            .Where(g => g.Count() > 1);

        foreach (var grupo in duplicados)
        {
            foreach (var (_, nombreMetodo, ruta, linea) in grupo)
            {
                resultados.Add(new CodeSmell
                {
                    Tipo = "Código Duplicado",
                    Archivo = ruta,
                    Elemento = nombreMetodo,
                    Linea = linea,
                    Descripcion = $"El cuerpo del método '{nombreMetodo}' está duplicado en {grupo.Count()} lugares"
                });
            }
        }

        return resultados;
    }

    private static string NormalizarCuerpo(string cuerpo) =>
        string.Concat(cuerpo.Where(c => !char.IsWhiteSpace(c)));
}
