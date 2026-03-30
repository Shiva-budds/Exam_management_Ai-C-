using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Exam_Management_With_AI.Model;

public class UserModel
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id{get; set;}
    [Required]
    [MaxLength(50)]
    public string FullName{get; set;} = string.Empty;

    [Required]
    [MaxLength(50)]

    public string PhoneNumber{get; set;} = string.Empty;
    [Required]
    [MaxLength(50)]

    public string Password{get; set;} = string.Empty;
    [Required]
    [MaxLength(50)]
    public string Role {get; set;} = string.Empty;
}
