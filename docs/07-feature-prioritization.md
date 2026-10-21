# 07. Feature Prioritization: Jadoo

## 1. Objective

Prioritize Jadoo's features based on user value, MVP objectives, implementation effort, dependencies, and risk.

The goal is to build the smallest useful product that validates whether structured property comparison improves rental decisions.

## 2. Prioritization Framework

Jadoo will use two frameworks:

1. **MoSCoW:** Classifies features as Must Have, Should Have, Could Have, or Won't Have for the current release.
2. **Value vs. Effort:** Helps sequence implementation based on expected user value and development complexity.

Priorities are provisional and should be updated using user research and usability results.

## 3. MoSCoW Prioritization

### Must Have (P0)

Essential for the initial MVP.

| Feature | User value | Reason |
|---|---|---|
| Property listings | High | Provides the core inventory |
| Property detail pages | High | Enables property evaluation |
| Budget and locality filters | High | Narrows the search |
| Furnishing and amenity filters | High | Matches user preferences |
| Cost breakdown | High | Improves financial transparency |
| Property shortlisting | High | Allows users to save options |
| Side-by-side comparison | High | Supports decision-making |
| Loading, empty, and error states | High | Makes core flows usable |
| Basic analytics instrumentation | High | Measures product usage |

### Should Have (P1)

Important improvements that can follow the core workflow or be implemented where existing infrastructure permits.

| Feature | User value | Reason |
|---|---|---|
| Commute evaluation | High | Helps assess location suitability |
| Neighborhood information | Medium to high | Supports locality evaluation |
| Virtual tour support | Medium to high | Enables remote inspection |
| Listing freshness indicators | High | Helps users assess data recency |
| Authentication and cross-device persistence | Depends on chosen model | Supports durable shortlists |

### Could Have (P2)

Useful enhancements that are not necessary to validate the core hypothesis.

| Feature | User value | Reason |
|---|---|---|
| AI-powered property recommendations | Potentially high | Requires sufficient data and evaluation |
| Natural-language search | Medium | Offers an alternative search interface |
| Saved-search alerts | Medium | Helps users track new listings |
| Advanced 3D and AR experiences | Medium | Requires suitable media and implementation effort |
| Neighborhood scoring | Potentially high | Requires defensible criteria and reliable data |

### Won't Have in V1

Explicitly excluded from the initial release.

- Rental payments and transaction processing.
- Legal verification and rental agreements.
- Full broker or property-owner CRM.
- Automated negotiation.
- Multi-city expansion before initial validation.
- Advanced predictive pricing models.

These features can be reconsidered after the MVP demonstrates user value.

## 4. Value vs. Effort Matrix

| Feature | Expected value | Relative effort | Recommendation |
|---|---|---|---|
| Property listings | High | Low to medium | Build first |
| Property details | High | Low | Build first |
| Search and filters | High | Medium | Build early |
| Cost breakdown | High | Low | Build early |
| Shortlisting | High | Low to medium | Build early |
| Property comparison | High | Medium | Build early |
| Analytics events | High | Low to medium | Add early |
| Commute integration | Medium to high | Medium to high | Build after core |
| Virtual tours | Medium to high | Depends on media | Support existing assets first |
| AI recommendations | Unvalidated | High | Defer |
| Advanced AR/VR | Unvalidated | High | Defer |

Effort estimates are relative planning assumptions, not measured engineering estimates.

## 5. Recommended Implementation Order

### Phase 1: Establish the Foundation

1. Inspect the existing codebase.
2. Define and validate the property schema.
3. Prepare a curated rental dataset.
4. Implement property listing cards.
5. Build property detail pages.

**Outcome:** Users can browse and inspect rental properties.

### Phase 2: Enable Property Discovery

1. Implement rent range filters.
2. Add locality filters.
3. Add property type, furnishing, and amenity filters.
4. Implement sorting and filter reset.
5. Handle empty search results.

**Outcome:** Users can find properties matching their preferences.

### Phase 3: Enable Decision-Making

1. Calculate monthly recurring costs.
2. Calculate known upfront expenses.
3. Implement property shortlisting.
4. Build side-by-side comparison.
5. Handle missing information and unavailable listings.

**Outcome:** Users can evaluate, compare, and save properties.

### Phase 4: Improve Evaluation

1. Add commute information.
2. Display locality context.
3. Support available floor plans and virtual tours.
4. Improve data freshness indicators.

**Outcome:** Users can evaluate shortlisted properties beyond rent and amenities.

### Phase 5: Measure and Validate

1. Instrument key product events.
2. Test core user journeys.
3. Conduct usability sessions.
4. Analyze search and shortlist behavior.
5. Prioritize fixes using observed friction.

**Outcome:** The team can decide whether to refine the core experience or expand functionality.

## 6. Dependency Mapping

| Feature | Dependency |
|---|---|
| Property listings | Property schema and inventory |
| Search filters | Consistent property attributes |
| Cost breakdown | Validated pricing fields and calculation rules |
| Shortlisting | Property identifiers and persistence strategy |
| Comparison | Standardized property attributes |
| Commute evaluation | Reliable coordinates and routing service |
| Virtual inspection | Supported media assets and viewer |
| Analytics | Event definitions and analytics destination |
| Recommendations | Reliable inventory, user signals, and evaluation criteria |

Build features in dependency order to avoid rework.

## 7. Feature Scoring Model

Use a simple weighted model to rank features when priorities conflict.

**Scoring formula:**

Score = (User Value × 0.40) + (Strategic Alignment × 0.30) + (Confidence × 0.20) + (Risk Reduction × 0.10)

Rate each dimension from 1 to 5.

- **User Value:** Expected improvement to the user experience.
- **Strategic Alignment:** Contribution to the core rental decision workflow.
- **Confidence:** Strength of supporting evidence.
- **Risk Reduction:** Reduction in important product or delivery risks.

Higher scores indicate stronger candidates for implementation, subject to dependencies and mandatory requirements.

| Feature | User value | Alignment | Confidence | Risk reduction |
|---|---:|---:|---:|---:|
| Property details | 5 | 5 | 5 | 4 |
| Search filters | 5 | 5 | 4 | 3 |
| Cost breakdown | 5 | 5 | 4 | 4 |
| Shortlisting | 4 | 5 | 4 | 2 |
| Property comparison | 5 | 5 | 3 | 3 |
| Commute evaluation | 4 | 4 | 3 | 2 |
| Virtual tours | 4 | 4 | 2 | 2 |
| AI recommendations | 3 | 3 | 1 | 1 |

*Scores are initial planning judgments, not user research findings. Re-score features after interviews and testing.*

## 8. Scope Control Rules

- Every feature must support a documented user need or product objective.
- P0 functionality must work end to end before advanced enhancements are prioritized.
- Avoid adding AI solely to make the product appear more advanced.
- Do not integrate external services until the expected value justifies their complexity and cost.
- Treat data accuracy and transparency as core requirements, not optional enhancements.
- Defer features that depend on unavailable data.
- Revisit priorities after each user-testing cycle.

## 9. MVP Release Gate

The MVP can proceed to initial validation when:

- Users can search and filter rental properties.
- Property details display available information consistently.
- Cost breakdowns use tested calculation rules.
- Users can save and compare properties.
- Missing data is handled explicitly.
- Core workflows function on desktop and mobile.
- Analytics events are recorded and verified.
- No critical usability or functional defects remain.

## 10. Conclusion

Jadoo should prioritize property discovery, cost transparency, shortlisting, and comparison before investing in advanced AI, AR, or VR functionality.

This approach minimizes implementation risk and focuses development effort on the product's central hypothesis: helping renters make better decisions from available property information.
