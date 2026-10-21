# 06. Product Requirements Document (PRD): Jadoo

## 1. Document Overview

| Attribute | Details |
|---|---|
| Product | Jadoo |
| Version | MVP V1.0 |
| Product category | Rental property discovery and decision support |
| Initial market | Bangalore, India |
| Primary users | Relocating professionals and fresh graduates |
| Platform | Web application |
| Document status | Draft for implementation |

## 2. Product Vision

Make rental property discovery more transparent and efficient by helping users evaluate, compare, and shortlist suitable homes using consistent property information, cost breakdowns, location context, and virtual inspection where available.

## 3. Problem Statement

People relocating to unfamiliar cities often rely on multiple property portals, agents, maps, and manual notes to find a suitable rental home.

Inconsistent listing information, unclear additional expenses, commute uncertainty, and limited remote inspection make it difficult to evaluate properties before visiting them.

Jadoo aims to consolidate these decision-making activities into one workflow.

## 4. Target Users

### Primary Persona: Relocating Professional

Needs a rental property within a defined budget and convenient commuting distance before moving to Bangalore.

### Secondary Persona: Student or Fresh Graduate

Needs affordable accommodation with transparent expenses and essential amenities.

### Secondary Persona: Existing Renter

Wants to compare alternatives based on rent, amenities, and commute before moving.

## 5. Product Goals

1. Help users discover properties that match their requirements.
2. Make recurring costs and upfront expenses easier to understand.
3. Reduce manual effort when comparing properties.
4. Help users evaluate location and commute suitability.
5. Support remote property evaluation through available media.
6. Enable users to maintain a shortlist and proceed to enquiries.

## 6. Non-Goals

The initial MVP will not include:

- Rental payments or online booking transactions.
- Rental agreement generation.
- Legal or ownership verification.
- Full broker and property-owner CRM systems.
- Advanced machine-learning recommendations.
- Automated negotiation or price prediction.
- Mandatory 3D tours for every property.
- Expansion to multiple cities before validating the initial market.

## 7. MVP Feature Requirements

### P0: Essential Features

#### F1. Property Listing and Discovery

Users can browse available rental properties.

Each property card should display:
- Property title.
- Locality and address summary.
- Monthly rent.
- Property type and furnishing.
- Primary image.
- Key amenities.

**Acceptance criteria**
- Property cards display consistent attributes.
- Unavailable properties are excluded from active results.
- Missing information is clearly identified.
- Selecting a card opens the correct property detail page.

#### F2. Search and Filtering

Users can filter properties by:
- Minimum and maximum rent.
- Locality.
- Property type.
- Furnishing status.
- Selected amenities.

**Acceptance criteria**
- Filters can be applied together.
- Results satisfy all applicable filter conditions.
- Users can reset filters.
- Empty results display guidance for modifying the search.

#### F3. Property Detail Page

Users can view the complete information available for a property.

Required fields include:
- Title and description.
- Rent and security deposit.
- Maintenance charges, where available.
- Furnishing and amenities.
- Address and locality.
- Property photographs.
- Owner or agent contact information, where available.

**Acceptance criteria**
- All available property details are displayed.
- Missing fields are not represented as confirmed values.
- Contact actions work only when valid contact information exists.

#### F4. Cost Breakdown

Display recurring expenses separately from upfront payments.

**Estimated monthly cost**

Monthly rent + known monthly maintenance + known recurring charges.

**Estimated upfront payment**

First month's rent + refundable security deposit + disclosed brokerage and other upfront charges.

Avoid double-counting charges already included in rent. Clearly label estimates and exclude unknown values from confirmed totals.

**Acceptance criteria**
- Monthly and upfront expenses are displayed separately.
- The calculation uses available, non-duplicated cost components.
- Missing charges are disclosed.
- Refundable deposits are not treated as recurring expenses.

#### F5. Property Shortlisting

Users can save properties for later review.

**Acceptance criteria**
- A property can be added to or removed from the shortlist.
- The shortlist displays saved property information.
- Saved properties remain available according to the selected persistence model.
- Duplicate entries are prevented.

#### F6. Property Comparison

Users can compare selected properties side by side.

Comparison attributes:
- Monthly rent.
- Upfront expenses.
- Locality.
- Furnishing.
- Amenities.
- Commute information, where available.
- Media availability.
- Missing or unverified information.

**Acceptance criteria**
- The same attributes are presented for each property.
- Differences are easy to identify.
- Missing information is shown explicitly.
- Users can remove properties from the comparison.

### P1: Important Enhancements

#### F7. Commute and Locality Evaluation

Allow users to evaluate properties relative to a workplace or other destination.

**Acceptance criteria**
- The destination and travel mode are identified.
- Travel estimates use supported routing information.
- Unavailable estimates are clearly indicated.
- The application does not present straight-line distance as travel time.

#### F8. Virtual Property Inspection

Support photographs, floor plans, videos, or 360-degree tours.

**Acceptance criteria**
- Available media can be viewed from the property page.
- Unsupported or missing media does not break the page.
- The interface distinguishes immersive tours from ordinary photographs.

### P2: Future Enhancements

- Personalized recommendations.
- AI-powered property search.
- Natural-language property queries.
- Automated property alerts.
- Appointment scheduling.
- Owner onboarding and listing management.
- Advanced 3D and AR experiences.

## 8. Core User Stories

| ID | User story | Priority |
|---|---|---|
| US-01 | As a renter, I want to browse rental properties so that I can discover available options. | P0 |
| US-02 | As a renter, I want to filter by budget and locality so that I can narrow the results. | P0 |
| US-03 | As a renter, I want to view property details so that I can evaluate suitability. | P0 |
| US-04 | As a renter, I want to understand monthly and upfront costs so that I can plan my budget. | P0 |
| US-05 | As a renter, I want to save properties so that I can revisit them. | P0 |
| US-06 | As a renter, I want to compare properties so that I can make a better choice. | P0 |
| US-07 | As a renter, I want to evaluate commute convenience so that I can choose a suitable location. | P1 |
| US-08 | As a renter, I want to inspect available virtual media so that I can evaluate properties remotely. | P1 |

## 9. Core User Flow

1. User opens Jadoo.
2. User enters search preferences.
3. Application displays matching properties.
4. User opens property details.
5. User reviews costs, amenities, and location.
6. User saves relevant properties.
7. User compares shortlisted options.
8. User selects preferred properties.
9. User contacts the owner or agent using available contact details.

## 10. Functional Requirements

The application must:

- Retrieve property records from the configured data source.
- Apply supported filters consistently.
- Display standardized property attributes.
- Calculate cost estimates using defined formulas.
- Maintain shortlist state.
- Compare selected properties.
- Handle missing, invalid, or unavailable data gracefully.
- Support responsive layouts across common screen sizes.
- Provide appropriate loading, empty, and error states.

Detailed functional requirements will be maintained in `08-functional-requirements.md`.

## 11. Non-Functional Requirements

### Performance
- Target initial property results within 2 seconds under the agreed test conditions.
- Optimize images and avoid unnecessary database requests.
- Paginate or progressively load large result sets.

### Security
- Validate user inputs on the server.
- Protect authenticated endpoints.
- Keep secrets and API credentials out of client-side code.
- Enforce access controls for private user data.

### Reliability
- Handle unavailable property records and external services gracefully.
- Avoid displaying failed or stale results as current.
- Log errors needed for debugging.

### Usability
- Use consistent property cards and detail layouts.
- Make important cost information easy to find.
- Provide clear feedback for filters and shortlist actions.

### Data Quality
- Validate required property fields.
- Track missing information.
- Distinguish verified information from owner-provided details and estimates.

## 12. Data Requirements

Each property should support the following information:

- Unique property identifier.
- Title and description.
- Property type and furnishing.
- Rent, deposit, and maintenance.
- Address, locality, and pincode.
- Amenities.
- Photographs and optional virtual media.
- Owner or agent contact details, where available.
- Availability status.
- Listing creation and update timestamps.
- Data source and verification status, where supported.

The detailed schema will be defined in `10-database-design.md`.

## 13. Success Metrics

The MVP should measure:

- Search completion rate.
- Property detail engagement.
- Filter usage.
- Shortlist rate.
- Comparison adoption rate.
- Time to first shortlist.
- Enquiry conversion rate.
- Property data completeness.

Metric definitions and targets will be finalized in `12-kpi-framework.md`. Initial targets should be set after collecting baseline data rather than inventing performance benchmarks.

## 14. Risks and Dependencies

| Risk or dependency | Mitigation |
|---|---|
| Insufficient property inventory | Begin with a curated dataset |
| Outdated listing information | Track update timestamps and availability |
| Missing cost details | Show unknown values explicitly |
| External map API limitations | Define a fallback when commute data is unavailable |
| Lack of virtual-tour assets | Support ordinary photos and floor plans |
| Low user trust | Explain data provenance and verification status |
| Scope expansion | Enforce P0, P1, and P2 priorities |

## 15. MVP Release Plan

### Phase 1: Foundation
- Review the existing codebase.
- Define the property data model.
- Load curated rental listings.
- Implement property discovery and detail pages.

### Phase 2: Decision Support
- Implement filters.
- Add cost breakdowns.
- Add shortlisting.
- Build property comparison.

### Phase 3: Location and Inspection
- Integrate supported commute information.
- Display available property media.
- Improve missing-data and error handling.

### Phase 4: Validation
- Test core user journeys.
- Conduct usability sessions.
- Fix high-impact issues.
- Instrument key analytics events.
- Evaluate MVP success against baseline metrics.

## 16. Definition of Done

The MVP is ready for initial user testing when:

- P0 features work end to end.
- Property data passes required validation.
- Cost calculations have automated tests.
- Search and comparison handle missing data correctly.
- Core pages work on desktop and mobile.
- Critical user flows have been tested.
- Analytics events are implemented and verified.
- Deployment and error logging are operational.

## 17. Open Decisions

The following decisions must be finalized before implementation:

- Authentication requirements.
- Shortlist persistence for anonymous users.
- Maximum number of properties per comparison.
- Property data source and update frequency.
- Commute API selection and usage limits.
- Contact workflow and data privacy requirements.
- Whether the initial prototype uses curated data exclusively.

## 18. Conclusion

Jadoo V1 focuses on rental discovery and decision support rather than a full real-estate marketplace.

The initial release prioritizes property listings, search filters, transparent costs, shortlisting, and comparison. Commute evaluation and virtual inspection follow as important enhancements.

The product should expand only after usability testing demonstrates that the core workflow helps renters make more informed decisions.