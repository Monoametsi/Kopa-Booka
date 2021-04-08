const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategoryAndCampusSchema = new Schema({

	Art_Design_and_Architecture: {
		type: Array,
		required: true
	},
	College_of_Business_and_Economics: {
		type: Array,
		required: true
	},
	Education: {
		type: Array,
		required: true
	},
	Engineering_and_Built_Environment: {
		type: Array,
		required: true
	},
	Health_Sciences: {
		type: Array,
		required: true
	},
	Humanities: {
		type: Array,
		required: true
	},
	Law: {
		type: Array,
		required: true
	},
	Science: {
		type: Array,
		required: true
	},
	Campus: {
		type: Array,
		required: true
	}

});

const Category_and_campus_col = mongoose.model('Category and Campus Lists', CategoryAndCampusSchema);

const categoryCampusCol = new Category_and_campus_col({
	Art_Design_and_Architecture: [ "Architecture", "Fashion", "Graphic Design", "Industrial Design", "Interior Design", "Jewel Design & Manufacture", "Multimedia", "Visual Art" ],
	College_of_Business_and_Economics: ["Applied Information Systems", "Accountancy", "Business Management", "Finance & Investment Management", "Industrial Psychology & People Management", "Information & Knowledge Management", "Marketing Management", "Transport & Supply Chain Management", "Economics", "Public Management", "Governance & Public Policy", "Tourism & Hospitality" ],
	Education: ["Childhood Education", "Education & Curriculum Studies", "Education Leadership & Management", "Educational Psychology", "Science & Technology Education"],
	Engineering_and_Built_Environment: ["Chemical Engineering Technology", "Civil Engineering", "Construction Management & Quantity Survey", "Electric Engineering", "Mechanical Engineering", "Metallurgy", "Mine Surveying", "Mining", "Quality & Operation Management", "Town & Regional Planning"],
	Health_Sciences: ["Biomedical Technology", "Chiropractic", "Emergency Medical Care", "Environmental Health", "Homoeopathy", "Human Anatomy & Physiology", "Nursing", "Optometry", "Podiatry", "Radiography", "Somatology", "Sport & Movement Studies"],
	Humanities: ["African Languages", "Afrikaans", "Anthropology & Development Studies", "Communication Studies", "English", "French", "Greek & Latin Studies", "Historical Studie", "Journalism, Film & Television", "Linguistics", "Philosophy", "Politics & International Relation", "Religion Studies", "Social Work", "Sociology", "Strategic Communication"],
	Law: ["Mercantile Law", "Private Law", "Public Law"],
	Science: ["Computer Science", "Applied Physics & Engineering Mathematics", "Biochemistry", "Biotechnology & Food Technology", "Botany & Plant Biotechnology", "Chemistry", "Geography,Environmental Management", "Physics", "Applied Mathematics", "Statistics", "Zoology"],
	Campus: ["Any Campus", "Auckland Park Campus", "Bunting Campus", "Soweto Campus", "Doornfontein Campus"]
});

module.exports = {
	Category_and_campus_col
};