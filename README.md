# CampusFix

CampusFix is a campus issue-reporting and maintenance platform designed to help students report problems, track progress, and communicate with the teams responsible for resolving them.

## Problem

Campus maintenance requests are often scattered across messages, forms, and informal conversations. CampusFix provides a single workflow for reporting issues and keeping everyone informed.

## Planned capabilities

- Submit maintenance requests with a category, description, location, and photo
- Track request status from submission through resolution
- Allow staff or administrators to assign and update requests
- Notify students when a request changes status
- Search and filter requests by category, location, and priority
- Provide dashboards for recurring issues and resolution performance

## Suggested workflow

```text
Student submits issue
        ↓
Request is triaged and assigned
        ↓
Staff updates progress
        ↓
Student receives status updates
        ↓
Issue is resolved and closed
```

## Project status

This repository is currently an initial React/Vite scaffold. Product features and the application architecture will be developed in subsequent iterations.

## Development roadmap

- [ ] Define user roles and permissions
- [ ] Design the issue and status data model
- [ ] Build the request submission flow
- [ ] Add request tracking and status updates
- [ ] Add staff and administrator workflows
- [ ] Add notifications and analytics
- [ ] Add tests and deployment documentation

## Local development

Requirements: Node.js 18 or later.

```bash
git clone https://github.com/Abinanda123/campus-fix.git
cd campus-fix
npm install
npm run dev
```

Open the local Vite URL shown in the terminal.

## Available scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run preview` | Preview the production build |
| `npm run lint` | Check code quality |

## Contributing

Contributions and suggestions are welcome. Please open an issue to discuss a feature or bug before submitting a pull request.

## License

License information will be added when the project structure is established.
