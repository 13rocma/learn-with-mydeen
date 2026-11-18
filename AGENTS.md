# Architecture rules

- Keep prayer text accordion selections in the prayer guide parent, independent of the current step, so manual and automatic progression never reset the user's display choices.
- Use one AuthProvider with server-validated confirmed users and a nested ProtectedRoute for every app page; leave only auth, privacy and password recovery public to prevent route-by-route protection gaps.
- Route the app root to the existing first learning category and sanitize post-login destinations to same-origin paths; do not render the former public homepage.
- Store account profiles in public.profiles with owner-only RLS and an auth lifecycle trigger; record login timestamps through a user-scoped database function so they use server time.