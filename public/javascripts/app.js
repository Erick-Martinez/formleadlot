
function forceInit() {
	force.init(config);
};

function forceLogin(key) {
	forceInit();
	force.login(function(success) {
		var oauth = force.getOauth();
		setupLightning();
	});	
}

var _lightningReady = false;

function setupLightning(callback) {
	var appName = config.loApp;
	var oauth = force.getOauth();
    if (!oauth) {
        alert("Please login to Salesforce.com first!");
        return;
    }

	if (_lightningReady) {
		if (typeof callback === "function") {
			callback();
		}
	} else {
	    // transformación de la url para Lightning
	    var url = oauth.instanceUrl.replace("my.salesforce", "lightning.force");

	    $Lightning.use(appName, function() {
				_lightningReady = true;
				createComponent();
				if (typeof callback === "function") {
					callback();
				}
	        }, url, oauth.access_token);



	}
}

function createComponent(type, subjectId) {
    setupLightning(function() {
		$Lightning.createComponent("c:FormWeb", {}, "FormularioLead");
    });
}
