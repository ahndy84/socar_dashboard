module.exports = function(router, passport){
	console.log('user_passport 호출됨.');

	// 홈 화면 - index.ejs 템플릿을 이용해 홈 화면이 보이도록 함
	router.route('/').get(function(req, res) {
		console.log('/ 패스 요청됨.');
		res.redirect('/login');
	});

	// 로그인 화면 - login.ejs 템플릿을 이용해 로그인 화면이 보이도록 함
	router.route('/login').get(function(req, res) {
		console.log('/login 패스 요청됨.');
		res.render('login.ejs', {message: req.flash('loginMessage')});
	});

	// 사용자 인증 - POST로 요청받으면 패스포트를 이용해 인증함
	// 성공 시 /profile로 리다이렉트, 실패 시 /login으로 리다이렉트함
	// 인증 실패 시 검증 콜백에서 설정한 플래시 메시지가 응답 페이지에 전달되도록 함
	router.route('/login').post(passport.authenticate('local-login', {
    	successRedirect : '/main',
    	failureRedirect : '/login',
    	failureFlash : true
	}));

	// 회원가입 화면 - signup.ejs 템플릿을 이용해 회원가입 화면이 보이도록 함
	router.route('/signup').get(function(req, res) {
		console.log('/signup 패스 요청됨.');
		res.render('signup.ejs', {message: req.flash('signupMessage')});
	});

	// 회원가입 - POST로 요청받으면 패스포트를 이용해 회원가입 유도함
	// 인증 확인 후, 성공 시 /profile 리다이렉트, 실패 시 /signup으로 리다이렉트함
	// 인증 실패 시 검증 콜백에서 설정한 플래시 메시지가 응답 페이지에 전달되도록 함
	router.route('/signup').post(passport.authenticate('local-signup', {
    	successRedirect : '/main',
    	failureRedirect : '/signup',
    	failureFlash : true
	}));

	// 프로필 화면 - 로그인 여부를 확인할 수 있도록 먼저 isLoggedIn 미들웨어 실행
	router.route('/profile').get(function(req, res) {
		console.log('/profile 패스 요청됨.');

    	// 인증된 경우, req.user 객체에 사용자 정보 있으며, 인증안된 경우 req.user는 false값임
    	console.log('req.user 객체의 값');
		console.dir(req.user);

    	// 인증 안된 경우
    	if (!req.user) {
        	console.log('사용자 인증 안된 상태임.');
        	res.redirect('/');
        	return;
    	}

    	// 인증된 경우
    	console.log('사용자 인증된 상태임.');
		if (Array.isArray(req.user)) {
			res.render('profile.ejs', {user: req.user[0]._doc});
		} else {
			res.render('profile.ejs', {user: req.user});
		}
	});

	// 메인 화면 - 로그인 여부를 확인할 수 있도록 먼저 isLoggedIn 미들웨어 실행
	router.route('/main').get(function(req, res) {
		console.log('/main 패스 요청됨.');

    	// 인증된 경우, req.user 객체에 사용자 정보 있으며, 인증안된 경우 req.user는 false값임
    	console.log('req.user 객체의 값');
		console.dir(req.user);

    	// 인증 안된 경우
    	if (!req.user) {
        	console.log('사용자 인증 안된 상태임.');
        	res.redirect('/');
        	return;
    	}

    	// 인증된 경우
    	console.log('사용자 인증된 상태임.');
		if (Array.isArray(req.user)) {
			res.render('main.ejs', {user: req.user[0]._doc});
		} else {
			res.render('main.ejs', {user: req.user});
		}
	});

	// 로그아웃 - 로그아웃 요청 시 req.logout() 호출함
	router.route('/logout').get(function(req, res) {
		console.log('/logout 패스 요청됨.');

		req.logout();
		res.redirect('/');
	});

}
