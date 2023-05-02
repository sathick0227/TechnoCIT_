export const SERVICES = {
    BASE_URL: 'http://31.220.82.50:202',
    AUTHENTICATE: '/letsunite/api/Auth/Authentication',
    REGISTER: '/letsunite/api/Auth/Register',
    ADDEVENT: '/letsunite/api/Event/AddEvent',
    EVENTS: '/letsunite/api/Event/GetEvents',
    DELETE: '/letsunite/api/Event/DeleteEvent/',
    UPDATE: '/letsunite/api/Event/UpdateEvent',
    GETSPORT:'/letsunite/api/Sport/GetAllSports',
    GETEVENTBYID:'/letsunite/api/Event/GetEventById/',
    GETVENUELIST:'/letsunite/api/Venue/GetVenueList',
    GET: 'get',
    POST: 'post',
    PUT:'put',
    HEADERS: {
        'Content-Type': 'application/json'
    },

}

export const COMPONENTS = {
    CONTAINED: 'contained',
    MARGIN_TYPE: 'normal',
    ERROR_MAIN: 'error.main',
    VALID_ERROR: 'Please Enter Valid',
    EMPTY_ERROR: 'Please Enter',
    POSITION: 'static',
    H6: 'h6',
    DIV: 'div',
    NUM_ONE: 1,
    COLOR_TYPE: 'inherit',
    FONT_SIZE: 12,
    THEME: 'light',
    DARK: 'dark',
    POSITION_BOTTOM: 'bottom-center',
    COMP_TYPE: 'main',
    MAX_WIDTH: 'xs',
    MAX_WIDTH1: 'sm',
    FLEX: 'flex',
    COLUMN: 'column',
    DEFAUT_PADDING: 5,
    CENTER: 'center',
    FONTWEIGHT: '600',
    H4: 'h4',
    H5: 'h5',
    NUMBER: 'number',
    TEXT: 'text',
    EMAIL: 'email',
    VENUEID: 'venueid',
    PASSWORD: 'password',
    REMEMBER: 'remember',
    SUBMIT: 'submit',
    CONTAINED: 'contained',
    BODY2: 'body2',
    EIGHT: 8,
    CARD_HEIGHT: '100vh',
    NAME: 'name',
    ROLE: 'role',
    DESCRIPTION: 'description',
    MOBILE: 'mobile',
    DOB: 'dob',
    VENUEOTHER: 'venueother',
    YOP: 'yearsOfExp',
    EVENTDATE: 'eventdate',
    SPORTID: 'sportId',
    SPORTIDADD:'sportid',
    MACHINE_ID: 'machineId',
    EVENTENDTIME: 'eventendtime',
    CREATEDBY: 'createdby',
    EVENTSTARTTIME: 'eventstarttime',
    DATE: 'date'
}

export const COLORS = {
    WHITE: 'rgba(255,255,255,1)',
    PRIMARY: 'primary',

}

export const SCREENS = {
    INITIAL: '/',
    SIGNUP: '/signup',
    HOME: '/home',
    HASH: '#'
}

export const STRING = {
    LESS: 'Less',
    MORE: 'More',
    HOME_TITLE: 'Welcome Back',
    LOGOUT: 'Logout',
    LOGIN: 'Login',
    UPDATE: 'Update Event',
    ADDNEW: 'Add new Event',
    VENUEID: 'venueID',
    CREATEDBY: 'Created By',
    EMAIL: 'Email',
    PASSWORD: 'Password',
    REMEMBER: 'Remember me',
    SUBMIT: 'Submit',
    FORGOT_PASSWORD: 'Forgot password?',
    SIGNUP_TEXT: `Don't  have an account? Sign Up`,
    SIGNUP_SUCCESS_MSG: 'Successfully SignUp Please LogIn',
    SIGN_UP: 'Sign up',
    NAME: 'Name',
    ROLE: 'Role',
    DESCRIPTION: 'Description',
    EMAIL: 'Email',
    PASSWORD: 'Password',
    MOBILE: 'Mobile',
    VENUEOTHER: 'Venue other',
    DOB: 'Date of Birth',
    EVENTDATE: 'Event Date',
    EXPERIENCE: 'Year of Exprience',
    SPORT_ID: 'Sport Id',
    MARCHANT: 'Machine Id',
    EVENTENDTIME: 'Event end time',
    EVENTSTARTTIME: 'Event start time',
    SUBMIT: 'Submit',
    LOGIN_TEXT: 'Already have a account? Log In'
}

export const UTILS = {
    MAX_PHONE_LENGTH: 13,
    MIN_PHONE_LENGTH: 8
}