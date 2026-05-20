# Pagination & Dynamic Content


> The `:should-refresh="true"` prop enables automatic registration of newly-added draggable items. Use it whenever the children of a `Container` change after mount — pagination, infinite scroll, reassigning the underlying array, or any other dynamic update.

Without `should-refresh`, items appended to (or replacing) the source array after the first render are not picked up as draggables until the next drag starts, which can leave them without animation transitions and — in some cases — produce a `null` `addedIndex` on drop.


<doc-example title="Pagination" file="pagination" />

:::tip


#### When to enable it:
- **Pagination** — loading new pages of data from an API
- **Infinite scroll** — appending items as the user scrolls
- **Array reassignment** — replacing the source array with a new one (e.g. after a fetch or filter)
- **Dynamic content** — items added after the initial component mount
- **Search results** — items added or refreshed on user input

:::

:::warning

`should-refresh` only reacts to DOM changes while no drag is in progress. If you need to add items *during* an active drag, call the imperative `refreshDraggables()` method on the container instance instead.

:::
