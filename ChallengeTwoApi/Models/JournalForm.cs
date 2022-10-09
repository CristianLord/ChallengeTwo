using System.ComponentModel.DataAnnotations.Schema;

namespace ChallengeTwoApi.Models
{
    /// <summary>
    /// Journal to forms model.
    /// </summary>
    public class JournalForm
    {
        public string Title { get; set; }
        public int IdUser { get; set; }
        public IFormFile? File { get; set; }
    }
}
