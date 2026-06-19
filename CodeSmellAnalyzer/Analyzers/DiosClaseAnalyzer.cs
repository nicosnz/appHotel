using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using CodeSmellAnalyzer.Models;

namespace CodeSmellAnalyzer.Analyzers;

public class DiosClaseAnalyzer : IAnalizador
{
    private const int UmbralMetodos = 10;
    private const int UmbralDependencias = 5;

    public List<CodeSmell> Analizar(SyntaxTree arbol, string rutaArchivo)
    {
        var resultados = new List<CodeSmell>();

        foreach (var clase in arbol.GetRoot().DescendantNodes().OfType<ClassDeclarationSyntax>())
        {
            var cantidadMetodos = clase.Members.OfType<MethodDeclarationSyntax>().Count();
            var cantidadDependencias = clase.Members.OfType<FieldDeclarationSyntax>().Count();

            if (cantidadMetodos > UmbralMetodos || cantidadDependencias > UmbralDependencias)
            {
                var ubicacion = arbol.GetLineSpan(clase.Span);
                resultados.Add(new CodeSmell
                {
                    Tipo = "Dios Clase",
                    Archivo = rutaArchivo,
                    Elemento = clase.Identifier.Text,
                    Linea = ubicacion.StartLinePosition.Line + 1,
                    Descripcion = $"La clase tiene {cantidadMetodos} métodos y {cantidadDependencias} dependencias " +
                                  $"(umbrales: {UmbralMetodos} métodos, {UmbralDependencias} dependencias)"
                });
            }
        }

        return resultados;
    }
}
