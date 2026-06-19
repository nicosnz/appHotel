using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using CodeSmellAnalyzer.Models;

namespace CodeSmellAnalyzer.Analyzers;

public class NumeroMagicoAnalyzer : IAnalizador
{
    private static readonly HashSet<string> NumerosPermitidos = ["0", "1", "2", "-1"];

    public List<CodeSmell> Analizar(SyntaxTree arbol, string rutaArchivo)
    {
        var resultados = new List<CodeSmell>();

        foreach (var literal in arbol.GetRoot().DescendantNodes().OfType<LiteralExpressionSyntax>())
        {
            if (!literal.IsKind(SyntaxKind.NumericLiteralExpression)) continue;

            var valor = literal.Token.ValueText;
            if (NumerosPermitidos.Contains(valor)) continue;

            var ancestro = literal.Ancestors()
                .FirstOrDefault(a => a is FieldDeclarationSyntax or AttributeArgumentSyntax);

            if (ancestro is FieldDeclarationSyntax campo)
            {
                if (campo.Modifiers.Any(m => m.IsKind(SyntaxKind.ConstKeyword))) continue;
            }
            if (ancestro is AttributeArgumentSyntax) continue;

            var ubicacion = arbol.GetLineSpan(literal.Span);
            resultados.Add(new CodeSmell
            {
                Tipo = "Número Mágico",
                Archivo = rutaArchivo,
                Elemento = valor,
                Linea = ubicacion.StartLinePosition.Line + 1,
                Descripcion = $"Número '{valor}' hardcodeado sin nombre descriptivo"
            });
        }

        return resultados;
    }
}
