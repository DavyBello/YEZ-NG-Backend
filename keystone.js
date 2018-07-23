// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv').config();

// Require keystone
const keystone = require('keystone');

// Initialise Keystone with your project's configuration.
// See http://keystonejs.com/guide/config for available options
// and documentation.

keystone.init({
	'name': 'yez-ng-backend',
	'brand': 'Youth Empowerment Zone',
	'less': 'public',
	'static': 'public',
	'favicon': 'public/favicon.ico',
	'views': 'templates/views',
	'view engine': 'pug',

	'emails': 'templates/emails',

	'auto update': true,
	'session': true,
	'auth': true,
	'user model': 'keystoneAdmin',
});

// Load your project's Models
keystone.import('models');
keystone.import('subModels');

// Setup common locals for your templates. The following are required for the
// bundled templates and layouts. Any runtime locals (that should be set uniquely
// for each request) should be added to ./routes/middleware.js
keystone.set('locals', {
	_: require('lodash'),
	env: keystone.get('env'),
	utils: keystone.utils,
	editable: keystone.content.editable,
});

// Load your project's Routes
keystone.set('routes', require('./routes'));


// Configure the navigation bar in Keystone's Admin UI
keystone.set('nav', {
	candidates: ['Candidate', 'Education', 'JobExperience', 'Certificate' ],
	// CandidateDocuments: ['CandidateDocument', 'SkillAnalysisResult', 'SeekerResult', 'StartupResult'],
	// Companies: ['CompanyMessage', 'Company', 'Industry', 'Job'],
	// CenterManager: 'CenterManager',
	// poll: ['Poll', 'PollVote'],
	country: ['State', 'LocalGovernment'],
	//posts: ['posts', 'post-categories'],
	//galleries: 'galleries',
	// enquiries: 'enquiries',
	users: ['keystoneAdmin', 'users'],
});

// Configure cloudinary
keystone.set('cloudinary config', process.env.CLOUDINARY_URL );

keystone.set('brandDetails', {
	brand: keystone.get('brand') || 'Youth Empowerment Zone',
	mailAddress: '22 Kumasi Cresent, Wuse 2, Abuja',
	homepageUrl: process.env.FRONT_END_URL,
	phone: '+234.818.855.5611',
	emailLogoUrl: `http://www.mycareerchoice.global/static/images/mcclogo-text-dark.png`
});

//check for environment variables
function checkEnv(envVariable) {
	if (!process.env[envVariable]) {
		console.log('----------------------------------------'
		+ `\nWARNING: MISSING ${envVariable} CREDENTIALS`
		+ '\n----------------------------------------')
	}
}

checkEnv('FRONT_END_URL');
checkEnv('JWT_SECRET');
// checkEnv('ACTIVATION_JWT_SECRET');

// Start Keystone to connect to your database and initialise the web server
if (!process.env.MAILGUN_API_KEY || !process.env.MAILGUN_DOMAIN) {
	console.log('----------------------------------------'
	+ '\nWARNING: MISSING MAILGUN CREDENTIALS'
	+ '\n----------------------------------------'
	+ '\nYou have opted into email sending but have not provided'
	+ '\nmailgun credentials. Attempts to send will fail.'
	+ '\n\nCreate a mailgun account and add the credentials to the .env file to'
	+ '\nset up your mailgun integration');
}

keystone.start();
