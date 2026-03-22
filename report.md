# Client Progress Report

Date: 2026-03-14
Project: `tues-landing-page`

## Completed (Done)

### Admin + Content Management
- Replaced native browser confirm for event deletion with a proper modal dialog in admin events.
- Fixed navbar overlap issue on admin news by increasing header stacking order.
- Verified admin news drag-and-drop order persists to landing page via `sortOrder`.
- Updated admin news permissions behavior so "Add article" button is always visible.
- Switched admin media uploads to presigned upload flow and connected hero/event/news media usage.
- Fixed hero media file input handlers (`video`, `fallback`, `image`) and added upload success/error feedback UI.
- Fixed hero background API payload mismatch (`mediaType` uppercase for backend) and normalized response mapping in clients.

### UI/Layout Polishing (Site)
- Updated event cards with modern spacing, visuals, and icon actions.
- Adjusted spacing/typography in student activities, alumni intro text, and "View All Events" alignment.
- Added `/virtual-tour` route and page entry from Virtual Tour section.

### Virtual Tour Feature (Major)
- Implemented Photo Sphere Viewer with Virtual Tour + Gallery plugins and 4-node tour data.
- Replaced demo panoramas with Poly Haven CC0 assets and campus-style labels.
- Removed caption credit text requested during review.
- Performance improvements applied:
  - Disabled linked-node preload.
  - Disabled transition loader and transition effects.
  - Reduced render cost (`antialias: false`, equirectangular resolution lowered).
  - Reduced gallery thumbnail size.
- Added custom first-load animated loader (7-ball animation) and disabled default PSV loader.
- Removed first-interaction/tutorial overlay (`psv-overlay-image` / capture overlay).
- Styled virtual-tour arrow behavior (hover/active), fixed hover blinking loop, and set arrow opacity baseline.
- Converted section layout to sit below navbar/header and fill viewport area under header.
- Removed viewer border radius (square edges), per latest request.
- Added custom arrow-hover tooltip card (`getLinkTooltip`) with image, title, and caption.
- Improved tooltip card image fitting with explicit fill/crop behavior.

## Pending / Open (Undone)

- Arrow SVG sizing still needs final visual QA on all breakpoints.  
  Current CSS forces a square button, but if any screen/browser still shows non-square SVG bounds, we should do one more pass with live browser verification and final sizing lock.

- Final UX sign-off for virtual tour controls layout (caption/gallery/navbar ordering) is still open.  
  Multiple iterative adjustments were applied; recommend one acceptance pass with the client to confirm expected final behavior.

- Optional optimization not yet done: replace remote large panorama files with optimized local assets (lower file size) for smoother low-end devices.

## Recommended Next Steps

1. Run a short browser QA checklist (desktop + mobile breakpoints) focused on virtual tour arrows, tooltip card, and navbar/canvas stacking.
2. Freeze final visual values (arrow size, tooltip card width/height, caption/gallery arrangement).
3. If performance remains a concern, generate optimized 2K/4K equirectangular images and switch node URLs.

