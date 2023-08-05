<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the web site, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * Localized language
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'local' );

/** Database username */
define( 'DB_USER', 'root' );

/** Database password */
define( 'DB_PASSWORD', 'root' );

/** Database hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */


/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';


/* Add any custom values between this line and the "stop editing" line. */



/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
if ( ! defined( 'WP_DEBUG' ) ) {
	define( 'WP_DEBUG', false );
}


define('AUTH_KEY',         'bO6NX8ayquU0zTuvuOi5yDcc6pA77Vv6I+j4oLV7pmDJm+FxD4P4x9yIrhLaiNPVDKRkMGcmXvy02UVIRSUFVQ==');
define('SECURE_AUTH_KEY',  'eip/B94AE1uwM1iJLXw28HhWY1BQWgqiVBeeHAQRZ/CU9z5Sk1Gw/DD+eWYkeWJ4IBsPB1MvBQ/1yNU6nstaBg==');
define('LOGGED_IN_KEY',    'RG1VLk0BQaylX/cIYp+giYputd2WRDzXvQpIrFDws3HITU1utVbacrR2hokGmoOrjuoj/UqsyKxnOAKf+UHxrg==');
define('NONCE_KEY',        '9nalCwvPHhNanj7g2hZc9HzdKg9CfHxYxTSKQtWxkRqEzuaqmOIxpPjCiWw44Vfq2sr3VKipi9BDJS24KQrNsg==');
define('AUTH_SALT',        'xiRq8On3v7la2cUWdWLBXFqNjkhi9NXkyvhvAvuq5KY0HFwn2dGH+LjAjOX6nVOg98k2Y1ioJilapNTeg0PTYg==');
define('SECURE_AUTH_SALT', 'JiaDuDdJSS+5VPGSD8rT6pS1+mU09wCVwqF+OvtLZVOJn48Qdcg+GTOHJwGN4Uxi7txsque0v7G6+ev2wmcD9A==');
define('LOGGED_IN_SALT',   '008iMsvhsKthHYBbbRyzHmSBjFDBIfM46J2GRM2S1GWg0KwVZRT+xoxMVI+JAKaSSyNIoCUMH31KeGaWiDDYOA==');
define('NONCE_SALT',       'M2EgklWJJKv5irCNW9Y2DTZYPs3/KjTlmHSjYQKcqSsVi8VDTTyLsorP58XZu0I0PHBxi2daXd0rlyNBdo4RWw==');
define( 'WP_ENVIRONMENT_TYPE', 'local' );
/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
