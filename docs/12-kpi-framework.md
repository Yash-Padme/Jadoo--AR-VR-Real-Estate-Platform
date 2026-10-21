# 12. KPI Framework: Jadoo

## 1. Objective

Define measurable indicators for evaluating Jadoo's rental discovery MVP, identifying user friction, and determining whether the product helps renters make informed property decisions.

The framework distinguishes product outcomes, user engagement, conversion, data quality, and technical performance.

## 2. North Star Metric

### Qualified Property Shortlists per Weekly Active Searcher

**Definition:** The average number of qualified rental shortlists created by users who actively search for properties during a given week.

A qualified shortlist is a saved set containing at least two distinct properties that satisfy the user's stated essential requirements.

**Formula:**

Qualified shortlists per weekly active searcher = Total qualified shortlists created during the week ÷ Unique weekly active searchers.

A user should not be counted as having a qualified shortlist merely for saving a single property.

### Why This Metric?

- Reflects meaningful progress beyond browsing.
- Aligns with Jadoo's property evaluation and comparison value proposition.
- Encourages relevant shortlisting rather than maximizing page views.
- Can be measured before rental transactions are supported.

**Limitation:** Shortlisting does not prove that a user found a suitable home or completed a rental. Validate this metric against user feedback and downstream enquiry outcomes.

## 3. KPI Categories

| Category | Purpose |
|---|---|
| Acquisition | Understand how users arrive |
| Activation | Measure whether users experience core value |
| Engagement | Measure meaningful product usage |
| Conversion | Measure progression toward enquiries |
| Data quality | Measure inventory reliability |
| Technical performance | Ensure the experience works reliably |

## 4. Activation KPIs

### 4.1 Search Completion Rate

**Definition:** Percentage of users who submit a search and successfully view results.

Formula:

Search completion rate = Users who view results after searching ÷ Users who submit a search × 100.

### 4.2 Property Detail Engagement Rate

**Definition:** Percentage of users who open at least one property detail page after viewing results.

Formula:

Property detail engagement rate = Users who open a property detail page ÷ Users who view property results × 100.

### 4.3 Activation Rate

**Definition:** Percentage of new users who complete a meaningful property evaluation action within their first session or a predefined activation window.

A suggested initial activation event is saving at least one property after reviewing its details.

Formula:

Activation rate = New users completing the activation event ÷ Eligible new users × 100.

Use a consistent activation window and exclude internal testing accounts.

## 5. Engagement KPIs

### 5.1 Shortlist Adoption Rate

Percentage of active searchers who save at least one property during the measurement period.

### 5.2 Comparison Adoption Rate

Percentage of active searchers who successfully compare at least two distinct properties.

### 5.3 Virtual Inspection Engagement Rate

Percentage of eligible property detail viewers who open a supported virtual tour.

Only include properties with a working virtual tour in the eligible denominator.

### 5.4 Repeat Search Rate

Percentage of users who perform another qualifying property search within a defined period after their first search.

Repeat searches can indicate continued engagement, but may also indicate that the user has not found a suitable property.

## 6. Conversion KPIs

### 6.1 Enquiry Initiation Rate

Percentage of eligible active searchers who initiate a property enquiry during the measurement period.

### 6.2 Shortlist-to-Enquiry Rate

Percentage of users who create a qualified shortlist and subsequently initiate an enquiry within the defined attribution window.

### 6.3 Search-to-Enquiry Rate

Percentage of users who initiate an enquiry after submitting a search.

For all conversion metrics, define whether the denominator is users, sessions, or events. Avoid mixing these units within a single calculation.

## 7. Data Quality KPIs

### 7.1 Listing Completeness Rate

Percentage of active listings containing all required fields for the MVP.

Formula:

Listing completeness rate = Active listings passing required-field validation ÷ Total active listings × 100.

### 7.2 Listing Freshness Rate

Percentage of active listings verified within the configured freshness window.

Formula:

Listing freshness rate = Active listings verified within the freshness window ÷ Active listings requiring freshness verification × 100.

Define the freshness window based on listing update processes and operational capabilities.

### 7.3 Cost Data Completeness

Percentage of active listings containing the required monetary information for the relevant cost calculation.

Track monthly cost completeness and upfront cost completeness separately.

### 7.4 Unavailable Listing Rate

Percentage of recently checked listings found to be unavailable.

This metric helps determine whether inventory freshness requires improvement.

## 8. Technical KPIs

| Metric | Definition |
|---|---|
| API error rate | Failed API requests ÷ Total API requests |
| API latency | Time taken to complete API requests, reported using median and p95 |
| Search response time | Time from search submission to usable results |
| Frontend error rate | Sessions experiencing a tracked frontend error ÷ Total eligible sessions |
| Analytics delivery rate | Valid expected events successfully recorded ÷ Expected events generated |
| Availability | Percentage of monitored time that the application is operational |

Technical metrics should be monitored independently from product engagement metrics.

## 9. KPI Dashboard Structure

A weekly dashboard should contain the following sections:

### A. Acquisition
- New users.
- Traffic sources.
- Landing-page sessions.

### B. Activation
- Search completion rate.
- Property detail engagement.
- Activation rate.

### C. Engagement
- Shortlist adoption rate.
- Comparison adoption rate.
- Repeat search rate.
- Virtual inspection engagement.

### D. Conversion
- Enquiry initiation rate.
- Shortlist-to-enquiry rate.
- Search-to-enquiry rate.

### E. Inventory Quality
- Listing completeness.
- Listing freshness.
- Cost data completeness.
- Unavailable listing rate.

### F. Technical Health
- API error rate.
- Search latency.
- Frontend error rate.
- Analytics delivery rate.

## 10. Target-Setting Method

Do not assign arbitrary growth targets before establishing baseline behavior.

Use the following process:

1. Instrument the core events.
2. Validate event accuracy and denominator definitions.
3. Collect baseline data during initial user testing.
4. Identify the largest sources of friction.
5. Set realistic improvement targets.
6. Run experiments against those targets.
7. Reassess targets after sufficient observations.

### Initial Validation Priorities

The first evaluation should answer:

- Can users complete a search?
- Can they understand the property cost breakdown?
- Can they compare two properties successfully?
- Can they create and revisit a shortlist?
- Does the product help them decide which properties deserve further investigation?

These questions are more useful initially than optimizing for large traffic or revenue figures.

## 11. Measurement Rules

- Define every KPI before implementation.
- Use unique users for user-level conversion rates.
- Use sessions only when session behavior is the intended unit.
- Define attribution windows for downstream actions.
- Exclude internal and automated test traffic.
- Deduplicate repeated events where appropriate.
- Segment results by device and relevant user group when sample sizes permit.
- Report missing analytics data rather than silently treating it as zero.
- Distinguish correlation from causal impact.

## 12. Review Cadence

### Daily During Active Testing
- Critical errors.
- Failed searches.
- Inventory and data-quality problems.

### Weekly
- Activation.
- Shortlisting and comparison.
- Search friction.
- Enquiry initiation.
- User feedback.

### At Each Release
- Compare KPIs with the previous baseline.
- Investigate unexpected changes.
- Validate whether the intended product improvement occurred.
- Record follow-up actions.

## 13. KPI Ownership

For a small MVP team, responsibilities can be assigned by function rather than by creating separate departments.

| Responsibility | Owner's role |
|---|---|
| Event implementation | Developer |
| Analytics validation | Developer or analyst |
| KPI definitions | Product owner |
| User research | Product owner or researcher |
| Data quality | Developer and inventory owner |
| Experiment analysis | Product owner or analyst |

One person may perform multiple roles during the MVP stage.

## 14. Success Criteria for Initial Validation

Jadoo should be considered ready for a broader pilot when:

- Core search and shortlist events are reliable.
- Users can complete the main rental evaluation tasks.
- Cost information is sufficiently complete for the supported calculations.
- Property comparison works consistently.
- Critical usability issues have been addressed.
- A baseline exists for activation, shortlisting, and comparison.
- The team can identify where users abandon the core workflow.

These are validation gates, not claims that the product has already achieved market fit.

## 15. Conclusion

Jadoo's KPI framework prioritizes meaningful user progress, especially successful property evaluation and qualified shortlisting.

The next step is to define controlled experiments that test the product's key assumptions and determine which changes measurably improve the rental-search experience.