<?php 
function print_nav($loginButton, $whoislogin){
    $navbar = "<nav class='navbar navbar-expand-lg navbar-dark bg-primary'>
                    <div class='container-fluid'>
                        <a class='navbar-brand' href='index.php'>Community</a>
                        <button class='navbar-toggler' type='button' data-bs-toggle='collapse'
                            data-bs-target='#navbarSupportedContent' aria-controls='navbarSupportedContent' aria-expanded='false'
                            aria-label='Toggle navigation'>
                            <span class='navbar-toggler-icon'></span>
                        </button>
                        <div class='collapse navbar-collapse' id='navbarSupportedContent'>
                            <ul class='navbar-nav me-auto mb-2 mb-lg-0'>
                                <li class='nav-item'>
                                    <a class='nav-link active' aria-current='page' href='#'>Home</a>
                                </li>
                                <li class='nav-item'>
                                    <a class='nav-link' href='#'>Link</a>
                                </li>
                                <li class='nav-item dropdown'>
                                    <a class='nav-link dropdown-toggle' href='#' id='navbarDropdown' role='button'
                                        data-bs-toggle='dropdown' aria-expanded='false'>
                                        Dropdown
                                    </a>
                                    <ul class='dropdown-menu' aria-labelledby='navbarDropdown'>
                                        <li><a class='dropdown-item' href='#'>Action</a></li>
                                        <li><a class='dropdown-item' href='#'>Another action</a></li>
                                        <li><hr class='dropdown-divider'></li>
                                        <li><a class='dropdown-item' href='#'>Something else here</a></li>
                                    </ul>
                                </li>
                                <li class='nav-item'>
                                    <form class='d-flex'>
                                        <input class='form-control me-2' type='search' placeholder='Search' aria-label='Search' name='search-title' >
                                        <button class='btn btn-outline-light' type='submit'>Search</button>
                                    </form>
                                </li>
                            </ul>
                            <div class='btn-group nav-btns'>
                                <div class='who-is-login'>
                                    <span>$whoislogin</span>
                                </div>
                                $loginButton
                                <div class='dropdown-menu'>
                                <!-- 로그인 버튼 -->
                                    <form action='login.php' method='post' class='px-4 py-3'>
                                        <div class='mb-3'>
                                            <label for='exampleDropdownFormEmail1' class='form-label'>Email address</label>
                                            <input name='email' type='email' class='form-control' id='exampleDropdownFormEmail1'
                                                placeholder='email@example.com'>
                                        </div>
                                        <div class='mb-3'>
                                            <label for='exampleDropdownFormPassword1' class='form-label'>Password</label>
                                            <input name='passwd' type='password' class='form-control' id='exampleDropdownFormPassword1'
                                                placeholder='Password'>
                                        </div>
                                        <div class='mb-3'>
                                            <div class='form-check'>
                                                <input type='checkbox' class='form-check-input' id='dropdownCheck'>
                                                <label class='form-check-label' for='dropdownCheck'>
                                                    Remember me
                                                </label>
                                            </div>
                                        </div>
                                        <button type='submit' class='btn btn-primary'>Sign in</button>
                                    </form>
                                    <div class='dropdown-divider'></div>
                                    <a class='dropdown-item' href='signUp.php'>New around here? Sign up</a>
                                    <a class='dropdown-item' href='#'>Forgot password?</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    </nav>";
                    
    return $navbar;
}

?>