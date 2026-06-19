namespace CodeSmellAnalyzer.Models;

public class CodeSmell
{
    public required string Tipo { get; init; }
    public required string Archivo { get; init; }
    public required string Elemento { get; init; }
    public required int Linea { get; init; }
    public required string Descripcion { get; init; }
}
