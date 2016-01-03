# Intros
### The easiest way to make connections through your personal network

(_this description is an idea for a finished MVP, not all features built yet_)

Intros helps people find connections through their personal network, without all the bloat and social baggage of LinkedIn.  It’s optimized for busy founders who don’t have time to manually update their social graph on a regular basis.

A user can request an intro to a specific person, or to someone at a specific company.  When this request is made, it is visible on a public* feed.   For other users, if the request matches someone in their personal network, it is also badged in their Inbox as a intro they could possibly make.

If a user helps with an intro which was not badged for them (i.e., the system did not know they had a connection to the person or company the intro was requesting), that person and company will be added as a connection for them.  This ensures that they need not constantly curate their own graph. 

Obviously, curating their graph does help them to be notified of relevant intro requests, so the app also makes it easy to quickly enter people and companies to which they are connected.

----

*the Intros app is intended for a “natural”, pre-existing network -- such as accelerator graduates -- such that all members of the network are considered to be connected to each other, so the “public” feed is not truly public.

# Todos & Open questions

## Priority
- Add a way to add your own contacts
- Real full-text search (Solr + Sunspot is nice)
- Database view and/or non-hacky serialization of connection search results (people + companies)
- Should other people's contacts' contact info be visible, or should they be hidden so people go through their connection?
- Add ability to mark an IntroRequest as fulfilled. It could be cool for tracking activity through the connection graph, if people could respond inline (and the system could see that someone helped with the request) but I also don't want to lose the lightweight directory feel and make people feel they have to use a channel other than their primary one (email).

## Wishlist
- Better graph data representation
- Ranking of connections based on session cohort, previous communication, declared closeness, ... 
- Visualization of connections
- Integrate with LinkedIn and/or CrunchBase for:
  - Automatic updates when someone moves companies, or when companies are acquired
  - Automatic import of past connections (previous employers / employees / companies)
- Write an OAuth identity provider so all internal apps like this could have a push-button login

