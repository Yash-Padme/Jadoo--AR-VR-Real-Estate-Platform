# 08. Functional Requirements: Jadoo

## 1. Purpose

Define the expected behavior of Jadoo's MVP, including property discovery, filtering, cost calculations, shortlisting, comparison, location evaluation, and virtual inspection.

These requirements translate the PRD into implementable and testable system behavior.

## 2. Scope

### In Scope
- Rental property listings.
- Property search and filtering.
- Property details.
- Monthly and upfront cost calculations.
- Shortlisting.
- Property comparison.
- Basic location and commute evaluation.
- Available property media.
- Error handling and analytics events.

### Out of Scope
- Rental payments.
- Online booking and agreement generation.
- Legal verification.
- Automated negotiation.
- Advanced AI recommendations.

## 3. Functional Requirement Summary

| ID | Requirement | Priority |
|---|---|---|
| FR-01 | Display rental property listings | P0 |
| FR-02 | Filter and sort properties | P0 |
| FR-03 | Display property details | P0 |
| FR-04 | Calculate estimated costs | P0 |
| FR-05 | Manage property shortlists | P0 |
| FR-06 | Compare properties | P0 |
| FR-07 | Evaluate commute and location | P1 |
| FR-08 | Display available property media | P1 |
| FR-09 | Handle missing and invalid data | P0 |
| FR-10 | Record key product events | P0 |
| FR-11 | Support property enquiry actions | P0, where valid contact data exists |

## 4. FR-01: Property Listings

### Description

The system shall display rental properties available in the configured inventory.

### Required Behavior

- Retrieve property records from the configured data source.
- Display properties using a consistent card layout.
- Show title, locality, rent, furnishing, primary image, and key amenities where available.
- Allow users to open a property detail page.
- Exclude properties marked unavailable from active results.

### Acceptance Criteria

- Every displayed property has a unique identifier.
- Selecting a card opens the corresponding property.
- Missing optional fields do not break the card.
- An empty inventory displays an appropriate empty state.
- Loading and retrieval errors are handled explicitly.

## 5. FR-02: Search, Filtering, and Sorting

### Supported Filters

- Minimum rent.
- Maximum rent.
- Locality.
- Property type.
- Furnishing status.
- Amenities.

### Business Rules

- Minimum rent must not exceed maximum rent.
- Rent values must be non-negative.
- Multiple selected filters must be applied together.
- Amenity filtering must use a consistent rule, such as requiring all selected amenities.
- Clearing filters restores the default result set.
- Sorting must use defined property attributes.

### Acceptance Criteria

- Results satisfy all active filters.
- Invalid ranges produce clear validation messages.
- Users can remove individual filters.
- Empty results suggest changing filters.
- Filter state remains consistent while navigating within the supported search workflow.

## 6. FR-03: Property Details

### Required Information

- Property title.
- Description.
- Property type.
- Rent.
- Deposit.
- Maintenance charges, when available.
- Address and locality.
- Furnishing.
- Amenities.
- Photographs.
- Availability status.
- Owner or agent contact information, when available.

### Business Rules

- Each detail page corresponds to one property identifier.
- Unknown values must be displayed as unavailable or not specified.
- Unavailable properties must not be presented as currently available.
- Contact actions must not be shown as functional when valid contact information is missing.

### Acceptance Criteria

Users can inspect the available information and return to the results or shortlist without losing the supported navigation state.

## 7. FR-04: Cost Calculation

### A. Estimated Monthly Cost

Monthly rent + known monthly maintenance + other known recurring charges not already included in rent.

### B. Estimated Upfront Payment

First month's rent + refundable security deposit + disclosed brokerage + other disclosed upfront charges.

### Business Rules

- Monthly recurring costs and upfront payments must be displayed separately.
- A refundable deposit must not be classified as a recurring expense.
- A charge already included in rent must not be counted twice.
- Unknown charges must not be silently treated as zero.
- Calculations must identify excluded or unavailable components.
- Estimates must be labeled as estimates, not guaranteed final payments.

### Acceptance Criteria

- Cost totals are calculated from the correct fields.
- Missing components are disclosed.
- Invalid negative amounts are rejected.
- Automated tests cover normal, missing-data, and boundary scenarios.

## 8. FR-05: Property Shortlisting

### Description

Users shall be able to save properties for later evaluation.

### Required Behavior

- Add a property to the shortlist.
- Remove a property from the shortlist.
- Display saved properties.
- Prevent duplicate entries.
- Preserve saved properties according to the configured persistence model.

### Business Rules

- A shortlist entry must reference a valid property.
- Removing a property must not delete the underlying listing.
- Unavailable properties should be clearly identified if retained in saved items.
- If anonymous shortlisting is supported, its persistence and privacy behavior must be defined.

### Acceptance Criteria

Users can add, view, and remove saved properties without creating duplicate shortlist entries.

## 9. FR-06: Property Comparison

### Description

Users shall be able to evaluate multiple properties side by side.

### Comparison Attributes

- Monthly rent.
- Estimated monthly cost.
- Estimated upfront payment.
- Locality.
- Furnishing.
- Amenities.
- Commute information, where available.
- Media availability.
- Availability and information quality.

### Business Rules

- Each property must be compared using the same attribute definitions.
- Missing values must be shown explicitly.
- The interface must distinguish estimated costs from confirmed charges.
- A configurable limit should prevent excessively large comparisons.
- Removing a property must update the comparison view.

### Acceptance Criteria

- Users can select properties for comparison.
- Differences in key attributes are visible.
- Missing information does not break the layout.
- Cost figures use the same calculation rules as the property detail page.

## 10. FR-07: Location and Commute Evaluation

### Description

Users should be able to evaluate a property relative to a destination, such as a workplace or college.

### Required Behavior

- Accept a supported destination.
- Use a supported routing service to calculate travel information.
- Identify the travel mode.
- Display unavailable estimates when routing data cannot be retrieved.

### Business Rules

- A property's coordinates must be sufficiently accurate for routing.
- Travel time must not be inferred from straight-line distance alone.
- External service failures must not block property discovery.
- External API credentials must not be exposed in client-side code when they require server-side protection.

### Acceptance Criteria

Commute information is displayed only when a valid estimate is available, and the interface identifies its travel mode.

## 11. FR-08: Property Media and Virtual Inspection

### Description

The system shall display available property images and supported inspection media.

### Supported Media

- Photographs.
- Floor plans.
- Property videos.
- 360-degree images or tours.
- Supported 3D experiences.

### Business Rules

- Media must be associated with the correct property.
- Unsupported media must not crash the detail page.
- Ordinary photographs must not be represented as immersive tours.
- Missing media must produce a graceful fallback state.

### Acceptance Criteria

Users can view available media and distinguish the type of inspection experience provided.

## 12. FR-09: Data Validation and Error Handling

### Validation Rules

- Property identifiers must be unique.
- Rent and monetary fields must be valid non-negative amounts.
- Required property attributes must satisfy the data schema.
- Contact fields must follow the supported format.
- Listing status must use defined values.
- Media references must be valid.
- User-supplied filter values must be validated before processing.

### Error Scenarios

| Scenario | Expected behavior |
|---|---|
| Inventory unavailable | Display an error and retry option |
| No matching results | Display an empty state |
| Invalid rent range | Display validation feedback |
| Property not found | Display a not-found state |
| Missing cost data | Mark the relevant amount as unavailable |
| Broken image | Show a fallback image or placeholder |
| Routing service unavailable | Hide the estimate and allow other actions |
| Duplicate shortlist action | Preserve one entry |

## 13. FR-10: Product Analytics

The system shall record key user interactions needed to evaluate the MVP.

### Initial Events

- `search_submitted`
- `filter_applied`
- `property_viewed`
- `property_saved`
- `property_unsaved`
- `comparison_started`
- `comparison_completed`
- `virtual_tour_opened`
- `property_enquiry_started`

### Event Requirements

- Events must use consistent naming.
- Event properties must follow a defined schema.
- Personally identifiable information must not be included unnecessarily.
- Failed actions should not be recorded as successful completions.
- Duplicate event firing should be minimized.
- Analytics failures must not interrupt the core user workflow.

Detailed definitions belong in `11-analytics-plan.md`.

## 14. FR-11: Property Enquiries

### Description

Users shall be able to initiate an enquiry when valid owner or agent contact information is available.

### Required Behavior

- Display the supported contact action.
- Associate the enquiry with the correct property.
- Handle missing contact information.
- Record the enquiry-start event where analytics is enabled.

### Acceptance Criteria

Users can identify the next step for contacting the property owner or agent. The application must not claim that a message was delivered or an appointment was confirmed unless the relevant system verifies that outcome.

## 15. Non-Functional Constraints

Although this document focuses on functional behavior, implementation must also satisfy the following constraints:

- Responsive design across common screen sizes.
- Appropriate server-side validation and access control.
- Efficient database queries and image loading.
- Graceful handling of external service failures.
- Clear separation between verified, owner-provided, estimated, and missing data.
- Appropriate privacy controls for user information and analytics.

## 16. Testing Requirements

### Unit Tests
- Cost calculation functions.
- Filter validation.
- Comparison attribute formatting.
- Property data validation.
- Shortlist uniqueness.

### Integration Tests
- Property retrieval.
- Filtered search.
- Property detail retrieval.
- Shortlist operations.
- Comparison data retrieval.
- Routing-service failure handling.

### End-to-End Tests
- Search and open a property.
- Apply filters and reset them.
- Evaluate property costs.
- Save and remove a property.
- Compare two properties.
- Open supported media.
- Initiate an enquiry.

## 17. Definition of Done

A requirement is complete when:

- Its business rules are implemented.
- Acceptance criteria are met.
- Relevant automated tests pass.
- Loading, empty, and error states are handled.
- Analytics events are verified where applicable.
- The feature works within the existing application architecture.
- No critical defects remain in its core workflow.

## 18. Conclusion

These functional requirements define the expected behavior of Jadoo's MVP and provide a foundation for implementation, testing, and acceptance.

The next step is to document the system architecture, including the frontend, backend, database, external services, and data flow between components.