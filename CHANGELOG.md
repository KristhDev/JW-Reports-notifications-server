# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [3.1.0] - 2025-12-03

### Added
- New class-based validation middleware for notifications
- BaseController pattern for handling requests
- Context support for logging methods
- Verify access token middleware for enhanced security

### Changed
- Refactored controllers to use BaseController pattern
- Standardized datasource naming in facades
- Updated server middleware implementation
- Improved error handling logic in JsonResponseUtil
- Standardized naming of data source contracts and error handling
- Refactored configuration to use env-var for environment variables

### Removed
- Useragent middleware from server configuration

## [3.0.0] - 2025-08-05

### Added
- Logtail integration for enhanced logging capabilities
- User agent adapter for better device identification
- New error handling system with DatasourceError
- Module aliasing for improved import paths
- Time adapter with configurable timezone support
- HTTP client adapter based on Axios
- Comprehensive usecases, facades, and datasources for app, preaching, revisits, and courses
- Dependency injection configuration
- Environment configuration file with Supabase key management
- Notifications service implementation
- New version notification endpoint

### Changed
- Updated logger adapter options
- Improved server structure and logging
- Refactored to use absolute paths with module aliasing
- Enhanced error handling with standardized error interfaces
- Updated dependencies and devDependencies
- Restructured notification logic
- Moved authentication middleware to presentation module
- Removed Supabase config and index files (consolidation)
- Updated Express and related packages
- Changed license to CC-BY 4.0

### Fixed
- Error handling improvements in facades
- Constructor parameter handling in errors
- User agent logging format and logic

## [2.1.2] - 2024-06-08

### Changed
- Updated license information in package.json
- Added Vercel configuration

### Fixed
- Minor development changes and fixes

## [2.1.1] - 2024-05-27

### Changed
- Dependency updates
- Updated README documentation

## [2.1.0] - 2024-05-27

### Changed
- Build system improvements
- Updated application version

## [2.0.0] - 2023-11-10

### Added
- New endpoint to send new app version notifications
- Enhanced logging system with API integration
- Improved error handling methods

### Changed
- Refactored notification logic
- Improved promise handling with synchronous code

## [1.1.0] - 2023-02-28

### Added
- Timezone handling capabilities
- New middleware and documentation
- Server build system

### Changed
- Refactored from cron jobs to HTTP server approach
- Removed node-cron dependency
- Removed Fly.io deployment configuration

### Fixed
- Language and content fixes in notifications
- Replaced include_player_ids with include_external_user_ids for OneSignal

## [1.0.0] - 2023-02-14

### Added
- Initial release of JW Reports Notifications Server
- Basic notification sending functionality
- OneSignal integration for push notifications
- README documentation and environment configuration

---

## Standards and Conventions

This changelog follows these standards:

### Versioning
- **Semantic Versioning (SemVer)**: MAJOR.MINOR.PATCH format
- **MAJOR**: Incompatible API changes
- **MINOR**: New functionality in backwards-compatible manner
- **PATCH**: Backwards-compatible bug fixes

### Change Types
- **Added**: New features
- **Changed**: Changes in existing functionality
- **Deprecated**: Soon-to-be removed features
- **Removed**: Now removed features
- **Fixed**: Bug fixes
- **Security**: Security-related changes

### Commit Message Convention
This project uses conventional commits with prefixes:
- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes
- `refactor:` - Code refactoring
- `test:` - Testing changes
- `build:` - Build system changes
- `ci:` - CI/CD changes
- `chore:` - Maintenance tasks
- `perf:` - Performance improvements

### Links
- [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)
- [Semantic Versioning](https://semver.org/spec/v2.0.0.html)
- [Conventional Commits](https://www.conventionalcommits.org/)