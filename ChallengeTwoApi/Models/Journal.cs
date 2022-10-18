using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace ChallengeTwoApi.Models
{
    /// <summary>
    /// Journal model.
    /// </summary>
    public class Journal
    {
        [Key]
        public int Id { get; set; }
        public string Title { get; set; }
        public string? PathFile { get; set; }
        [ForeignKey("User")]
        public int IdUser { get; set; }
        public DateTime UploadDate { get; set; }

        public virtual User? User { get; set; }
        
        [NotMapped]
        public IFormFile? File { get; set; }
    }
}
