# Content Security Policy (CSP) Fix Documentation

## Problem

Your application was experiencing CSP violations when deployed, causing:

- Google Fonts not loading
- Inline styles being blocked
- React components not rendering properly
- Geolocation API being blocked

## Root Cause

The `vercel.json` configuration had a very restrictive CSP policy:

```json
"Content-Security-Policy": "default-src 'self'; script-src 'self'; object-src 'none'; base-uri 'self';"
```

This blocked:

- External font sources (Google Fonts)
- Inline styles (required by React and Ant Design)
- Dynamic script evaluation (required by modern JS frameworks)

## Solutions Applied

### 1. Updated CSP Policy in vercel.json

The new policy allows:

- **Google Fonts**: `https://fonts.googleapis.com` for stylesheets and `https://fonts.gstatic.com` for font files
- **Inline Styles**: `'unsafe-inline'` for style-src (required by Ant Design)
- **Script Evaluation**: `'unsafe-eval'` for dynamic imports and code splitting
- **Images**: Support for data URLs, HTTPS sources, and blob URLs
- **API Connections**: HTTPS connections for API calls

### 2. Fixed Permissions Policy

- Removed the unrecognized `browsing-topics` directive
- Added proper permissions for geolocation, microphone, and camera

### 3. Enhanced Vite Build Configuration

- Added manual chunking for better CSP compatibility
- Separated vendor libraries (React, Ant Design) into separate chunks
- Enhanced build optimization

## CSP Policy Breakdown

```
default-src 'self'                    # Only allow same-origin by default
script-src 'self' 'unsafe-inline' 'unsafe-eval'  # Allow scripts, inline, and eval
style-src 'self' 'unsafe-inline' https://fonts.googleapis.com  # Allow styles and Google Fonts
font-src 'self' https://fonts.gstatic.com data:  # Allow fonts from Google and data URLs
img-src 'self' data: https: blob:    # Allow images from various sources
connect-src 'self' https:            # Allow HTTPS API connections
object-src 'none'                    # Block object/embed elements
base-uri 'self'                      # Only allow same-origin base URIs
frame-ancestors 'none'               # Prevent embedding in frames
```

## Security Considerations

### Current Setup (Balanced Security)

- Allows necessary functionality while maintaining reasonable security
- Blocks dangerous object/embed elements
- Prevents clickjacking attacks
- Enforces HTTPS for external connections

### Enhanced Security Option

If you need stricter security, use `vercel.secure.json`:

- Uses specific script hashes instead of `'unsafe-inline'`
- More restrictive permissions policy
- Includes `upgrade-insecure-requests` directive

## Recommendations

1. **Monitor CSP Violations**: Add CSP reporting to track any violations
2. **Regular Audits**: Periodically review and tighten CSP policies
3. **Testing**: Always test CSP changes in staging before production
4. **Documentation**: Keep this file updated when making CSP changes

## Alternative Configurations

### Development CSP (More Permissive)

```json
"Content-Security-Policy": "default-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' https:; font-src 'self' https: data:; img-src 'self' data: https: blob:; connect-src 'self' https: wss:;"
```

### Production CSP (Stricter)

Use the configuration in `vercel.secure.json` for production deployments.

## Troubleshooting

### If fonts still don't load:

1. Check browser network tab for blocked requests
2. Verify Google Fonts URLs in CSP policy
3. Ensure preconnect links in HTML are working

### If styles are still blocked:

1. Review inline style usage in components
2. Consider moving inline styles to CSS classes
3. Check for dynamic style generation by libraries

### If scripts are blocked:

1. Review for inline event handlers
2. Check for dynamic script evaluation
3. Consider using nonces for inline scripts

## Migration Path to Stricter CSP

1. **Phase 1**: Use current permissive policy
2. **Phase 2**: Remove inline styles, use CSS classes
3. **Phase 3**: Implement nonces for scripts
4. **Phase 4**: Remove `'unsafe-inline'` and `'unsafe-eval'`

This approach ensures your application works while gradually improving security.
