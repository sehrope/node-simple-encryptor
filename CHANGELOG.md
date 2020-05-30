# Changelog
All notable changes to this project will be documented in this file.

## [4.0.0] - 2020-05-30
### Breaking Changes
- Changed to export a non-default function createEncryptor(...) and update the typings to match.

## [3.0.0] - 2019-04-29
### Changed
- Added engines with min version of node v4.5.0
- Changed "aes256" cipher alias to full name of "aes-256-cbc"
### Breaking Changes
- Changed to use Buffer.from(...) which requires node >= v4.5.0

## [2.0.0] - 2018-08-30
### Added
- This changelog to track future changes.
### Changed
- Export format for TypeScript type definitions updated to use "export default ..." style.
### Breaking Changes
- None for core library vs v1.x but the type definition changes may cause compile errors.
