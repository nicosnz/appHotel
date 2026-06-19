using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using CodeSmellAnalyzer.Models;

namespace CodeSmellAnalyzer.Analyzers;

public class DemasiadosParametrosAnalyzer : IAnalizador
{
    private const int UmbralParametros = 3;

    public List<CodeSmell> Analizar(SyntaxTree arbol, string rutaArchivo)
    {
        var resultados = new List<CodeSmell>();

        foreach (var metodo in arbol.GetRoot().DescendantNodes().OfType<MethodDeclarationSyntax>())
        {
            var cantidadParametros = metodo.ParameterList.Parameters.Count;

            if (cantidadParametros > UmbralParametros)
            {
                var ubicacion = arbol.GetLineSpan(metodo.Span);
                resultados.Add(new CodeSmell
                {
                    Tipo = "Demasiados Parámetros",
                    Archivo = rutaArchivo,
                    Elemento = metodo.Identifier.Text,
                    Linea = ubicacion.StartLinePosition.Line + 1,
                    Descripcion = $"El método tiene {cantidadParametros} parámetros (umbral: {UmbralParametros})"
                });
            }
        }

        return resultados;
    }
}
