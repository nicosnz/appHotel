using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using CodeSmellAnalyzer.Models;

namespace CodeSmellAnalyzer.Analyzers;

public class MetodoLargoAnalyzer : IAnalizador
{
    private const int UmbralLineas = 20;

    public List<CodeSmell> Analizar(SyntaxTree arbol, string rutaArchivo)
    {
        var resultados = new List<CodeSmell>();

        foreach (var metodo in arbol.GetRoot().DescendantNodes().OfType<MethodDeclarationSyntax>())
        {
            var ubicacion = arbol.GetLineSpan(metodo.Span);
            var cantidadLineas = ubicacion.EndLinePosition.Line - ubicacion.StartLinePosition.Line + 1;

            if (cantidadLineas > UmbralLineas)
            {
                resultados.Add(new CodeSmell
                {
                    Tipo = "Método Largo",
                    Archivo = rutaArchivo,
                    Elemento = metodo.Identifier.Text,
                    Linea = ubicacion.StartLinePosition.Line + 1,
                    Descripcion = $"El método tiene {cantidadLineas} líneas (umbral: {UmbralLineas})"
                });
            }
        }

        return resultados;
    }
}
