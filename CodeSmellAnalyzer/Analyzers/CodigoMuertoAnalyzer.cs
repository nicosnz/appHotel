using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using CodeSmellAnalyzer.Models;

namespace CodeSmellAnalyzer.Analyzers;

public class CodigoMuertoAnalyzer : IAnalizador
{
    public List<CodeSmell> Analizar(SyntaxTree arbol, string rutaArchivo)
    {
        var resultados = new List<CodeSmell>();
        var raiz = arbol.GetRoot();

        var metodosPrivados = raiz.DescendantNodes()
            .OfType<MethodDeclarationSyntax>()
            .Where(m => m.Modifiers.Any(mod => mod.IsKind(SyntaxKind.PrivateKeyword)));

        var identificadoresUsados = raiz.DescendantNodes()
            .OfType<IdentifierNameSyntax>()
            .Select(i => i.Identifier.Text)
            .ToHashSet();

        foreach (var metodo in metodosPrivados)
        {
            var nombreMetodo = metodo.Identifier.Text;

            if (!identificadoresUsados.Contains(nombreMetodo))
            {
                var ubicacion = arbol.GetLineSpan(metodo.Span);
                resultados.Add(new CodeSmell
                {
                    Tipo = "Código Muerto",
                    Archivo = rutaArchivo,
                    Elemento = nombreMetodo,
                    Linea = ubicacion.StartLinePosition.Line + 1,
                    Descripcion = $"El método privado '{nombreMetodo}' no es utilizado en este archivo"
                });
            }
        }

        return resultados;
    }
}
