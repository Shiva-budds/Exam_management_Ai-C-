using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Exam_Management_With_AI.Model;

public class StudentTeacherModel
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id{get; set;}
    [Required]
    public int StudentId{get; set;}
    [Required]
    public int TeacherId{get; set;} 
    [Required]
    [MaxLength(50)]
    public string Status{get; set;} = string.Empty;
    [Required]
    public string CreatedAt{get; set;} = string.Empty;
}
