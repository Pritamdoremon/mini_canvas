# Mini Design Canvas

A small full-stack canvas editor built for a machine-coding discussion. It supports canvas CRUD, rectangles/circles/text, selection, drag, resize, rotate, property editing, and MongoDB persistence.

## Stack

- Next.js (App Router) + React Konva: editor state and canvas interactions
- Express: simple REST API
- MongoDB + Mongoose: canvas persistence

## Run locally

1. Install and start MongoDB locally, or create a MongoDB Atlas database.
2. Copy `.env.example` to the project-root `.env` and set `MONGODB_URI`, for example `mongodb://127.0.0.1:27017/mini-canvas`. `NEXT_PUBLIC_API_URL` can remain set to the local API URL.
3. Run `npm install` in the root, then `npm run install:all`.
4. Run `npm run dev` and open `http://localhost:3000`.

To create a production frontend build, run `npm run build --prefix frontend`.

## Data flow

```
User action → React elements state → React Konva renders
                           ↓
                       500ms debounce
                           ↓
               PUT /api/canvases/:id → MongoDB
```

`CanvasEditor` owns the editor interactions. `CanvasStage` translates Konva drag/transform events into simple element updates. `App` keeps the canvas list and performs debounced saves. The backend follows `route → controller → Mongoose model`.

## API

| Method | Endpoint | Purpose |
| --- | --- | --- |
| GET | `/api/canvases` | List canvases |
| POST | `/api/canvases` | Create a canvas |
| GET | `/api/canvases/:id` | Get one canvas |
| PUT | `/api/canvases/:id` | Update name and elements |
| DELETE | `/api/canvases/:id` | Delete a canvas |

The Mongoose schema validates canvas names and supported element types. Controllers return clear 400/404 responses, while shared middleware handles database and malformed-id errors.

## Scope and limitations

The editor deliberately uses a fixed 820×600 stage to keep the assignment focused. It has no authentication, undo/redo, image export, or multi-user collaboration. The one implemented convenience feature is debounced autosave: changes are sent to the API 500ms after the latest edit.
