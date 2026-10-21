# 04. User Journeys: Jadoo

## 1. Purpose

Document how users discover, evaluate, compare, and shortlist rental properties. This document identifies friction in the existing rental-search process and defines the intended MVP experience.

## 2. Primary User Journey

**Persona:** Rahul, a working professional relocating to Bangalore.

**Goal:** Find and shortlist a suitable 1BHK rental before moving to the city.

### Journey Overview

Search requirements → Discover properties → Evaluate details → Compare options → Shortlist → Contact owner or agent → Arrange visit

## 3. Current-State Journey

| Stage | User action | Pain point | Opportunity |
|---|---|---|---|
| 1. Define requirements | Decide budget and preferred area | Limited knowledge of localities | Guided preference collection |
| 2. Search | Browse multiple portals | Fragmented discovery | Centralized property discovery |
| 3. Evaluate | Open individual listings | Inconsistent property information | Standardized detail pages |
| 4. Calculate costs | Estimate deposit and monthly expenses | Additional costs may be unclear | Cost breakdown |
| 5. Compare | Switch between tabs or maintain notes | Manual comparison takes time | Side-by-side comparison |
| 6. Verify location | Check maps and commute | Travel convenience is difficult to assess | Commute information |
| 7. Inspect | Request videos or visit properties | Remote evaluation is limited | Supported virtual tours |
| 8. Decide | Contact owners or agents | Repeated coordination | Clear contact and next-step actions |

## 4. Proposed Jadoo Journey

### Stage 1: Enter Requirements

**User actions**
- Opens Jadoo.
- Selects rental property search.
- Enters a budget range.
- Selects preferred localities.
- Chooses furnishing and property preferences.
- Optionally enters a workplace or destination.

**System response**
- Stores the search criteria for the current session.
- Displays matching properties from available inventory.
- Shows an empty state if no properties match.

**Success condition:** The user receives a relevant, understandable set of results.

### Stage 2: Discover Properties

**User actions**
- Browses property cards.
- Reviews rent, locality, furnishing, and key amenities.
- Applies filters and changes sorting.

**System response**
- Displays standardized property summaries.
- Shows available property images.
- Indicates missing or unavailable information where relevant.

**Success condition:** The user can identify promising properties without opening every listing.

### Stage 3: Evaluate Property Details

**User actions**
- Opens a property detail page.
- Reviews rent, deposit, maintenance, amenities, and furnishing.
- Checks location information and available media.

**System response**
- Displays known property attributes.
- Separates recurring costs from upfront expenses.
- Presents estimated totals only when sufficient data is available.
- Provides a virtual tour when the property has supported media.

**Success condition:** The user understands the property's known costs and characteristics.

### Stage 4: Compare Properties

**User actions**
- Selects two or more properties.
- Opens the comparison view.
- Reviews differences in cost, location, furnishing, and amenities.

**System response**
- Presents standardized attributes in a comparison layout.
- Highlights meaningful differences.
- Identifies unavailable information rather than assuming values.

**Success condition:** The user can explain why one property is preferable to another.

### Stage 5: Shortlist Properties

**User actions**
- Saves promising properties.
- Revisits the shortlist.
- Removes unsuitable options.

**System response**
- Maintains the user's shortlist according to the supported persistence model.
- Displays saved property details.
- Allows the user to return to a property page.

**Success condition:** The user retains a manageable set of preferred properties.

### Stage 6: Take the Next Step

**User actions**
- Reviews the final shortlist.
- Uses available contact information to enquire about a property.
- Arranges a physical visit if required.

**System response**
- Displays available owner or agent contact options.
- Clearly identifies properties with missing or unverified contact information.

**Success condition:** The user can move from evaluation to a real-world enquiry.

*Note: Automated messaging, appointment booking, and transaction processing are not assumed to be part of the initial MVP.*

## 5. Journey Flow

<CodeBlock language="mermaid" editable={false}>flowchart TD
    A[Open Jadoo] --> B[Enter Search Preferences]
    B --> C[View Matching Properties]
    C --> D{Relevant Results?}
    D -- No --> E[Adjust Filters]
    E --> C
    D -- Yes --> F[Open Property Details]
    F --> G[Review Costs and Location]
    G --> H[Inspect Available Media]
    H --> I[Add to Shortlist]
    I --> J{Compare Properties?}
    J -- Yes --> K[Compare Shortlisted Options]
    K --> L[Select Preferred Properties]
    J -- No --> L
    L --> M[Contact Owner or Agent]
    M --> N[Arrange Property Visit]</CodeBlock>

## 6. Alternative Journey: Student or Fresh Graduate

**Goal:** Find affordable accommodation near college, work, or public transport.

1. Enters a maximum monthly budget.
2. Selects a preferred locality or destination.
3. Filters properties by furnishing and essential amenities.
4. Reviews rent, deposit, and maintenance charges.
5. Compares affordable alternatives.
6. Saves preferred properties.
7. Shares shortlisted options with family or contacts, if needed.

**Key design consideration:** Budget clarity should take precedence over advanced recommendations.

## 7. Exception and Edge Cases

| Scenario | Expected behavior |
|---|---|
| No matching properties | Suggest relaxing filters or changing localities |
| Missing maintenance charges | Mark as unavailable and exclude from confirmed cost totals |
| Missing deposit information | Display "Not specified" |
| Property listing unavailable | Show an appropriate unavailable state and remove it from active results |
| No virtual tour | Display available photos or floor plans instead |
| Incomplete location data | Avoid displaying unsupported commute estimates |
| User removes a shortlisted property | Update the shortlist immediately |
| Too many comparison properties | Set a reasonable comparison limit and explain it |

## 8. Key Experience Principles

- **Transparency:** Distinguish verified information, owner-provided details, estimates, and missing data.
- **Consistency:** Use the same attributes and cost definitions across property listings.
- **Efficiency:** Minimize unnecessary page transitions and repetitive data entry.
- **User control:** Let users modify filters and manage their shortlist.
- **Progressive disclosure:** Show essential information first and additional details when needed.
- **Honest visualization:** Never imply that a virtual tour exists when only ordinary photos are available.

## 9. Journey Success Metrics

| Metric | Definition |
|---|---|
| Search completion rate | Percentage of search starters who reach results |
| Property detail engagement | Percentage of result viewers who open a property |
| Comparison adoption rate | Percentage of active searchers who compare properties |
| Shortlist rate | Percentage of active searchers who save at least one property |
| Time to first shortlist | Time from starting a search to saving the first property |
| Enquiry conversion rate | Percentage of eligible users who initiate a property enquiry |

The KPI Framework will define precise event names, denominators, exclusions, and measurement windows.

## 10. Usability Testing Plan

Test the prototype with 5-8 representative users initially.

### Test Tasks

1. Find a rental within a specified monthly budget.
2. Filter properties by locality and furnishing.
3. Determine the estimated monthly and upfront costs of a property.
4. Compare two properties.
5. Save a preferred property.
6. Find the next step for contacting the owner or agent.

### Record

- Task completion or failure.
- Time taken per task.
- Number of incorrect actions.
- Points of confusion.
- User confidence before and after comparison.
- Missing information that prevents a decision.

Treat this small sample as formative usability research, not statistically representative market evidence.

## 11. Conclusion

Jadoo's core journey should take users from search preferences to property evaluation, comparison, shortlisting, and enquiry through a consistent workflow.

The MVP should prioritize reliable property information, transparent costs, and efficient comparison before adding advanced personalization or complex booking features.