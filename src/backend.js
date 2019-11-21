const uuid4 = require('uuid4');

function getSessionId() {
    let id = uuid4();

    if (uuid4.valid(id)) {
	return id;
    } else {
	return uuid4();
    }
}
