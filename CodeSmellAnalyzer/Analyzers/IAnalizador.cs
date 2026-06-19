using Microsoft.CodeAnalysis;
using CodeSmellAnalyzer.Models;

namespace CodeSmellAnalyzer.Analyzers;

public interface IAnalizador
{
    List<CodeSmell> Analizar(SyntaxTree arbol, string rutaArchivo);
}
