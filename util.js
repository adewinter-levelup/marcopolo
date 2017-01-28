module.exports = {
	logItOut :function(msg) {
	  if (typeof(msg) === "string") {
	    msg = { message: msg };
	  }
	  console.log(JSON.stringify(msg));
	}
}
