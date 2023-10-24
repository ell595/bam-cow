module.exports = (req, res, next) => {
    // Gather user info by destructuring request body
    const { email, name, password } = req.body;

    // Ensure email address is correctly formatted
    function validEmail(userEmail) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
    };

    // Validate inputs for /register and /login
    if (req.path === '/register') {
        if (![email, name, password].every(Boolean)) {
            return res.status(401).json('Missing Credentials');
        } else if (!validEmail(email)) {
            return res.status(401).json('Invalid Email');
        }
    } else if (req.path === '/login') {
        if (![email, password].every(Boolean)) {
            return res.status(401).json('Missing Credentials');
        } else if (!validEmail(email)) {
            return res.status(401).json('Invalid Email');
        }
    }

    next();
};