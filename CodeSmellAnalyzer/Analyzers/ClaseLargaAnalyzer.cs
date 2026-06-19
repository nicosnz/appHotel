using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using CodeSmellAnalyzer.Models;

namespace CodeSmellAnalyzer.Analyzers;

public class ClaseLargaAnalyzer : IAnalizador
{
    private const int UmbralLineas = 150;

    public List<CodeSmell> Analizar(SyntaxTree arbol, string rutaArchivo)
    {
        var resultados = new List<CodeSmell>();

        foreach (var clase in arbol.GetRoot().DescendantNodes().OfType<ClassDeclarationSyntax>())
        {
            var ubicacion = arbol.GetLineSpan(clase.Span);
            var cantidadLineas = ubicacion.EndLinePosition.Line - ubicacion.StartLinePosition.Line + 1;

            if (cantidadLineas > UmbralLineas)
            {
                resultados.Add(new CodeSmell
                {
                    Tipo = "Clase Larga",
                    Archivo = rutaArchivo,
                    Elemento = clase.Identifier.Text,
                    Linea = ubicacion.StartLinePosition.Line + 1,
                    Descripcion = $"La clase tiene {cantidadLineas} líneas (umbral: {UmbralLineas})"
                });
            }
        }

        return resultados;
    }
}
