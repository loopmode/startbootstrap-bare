startbootstrap-bare
===================

The "bare" template from the startbootstrap project, extended with RequireJS and a basic Backbone app structure.

app/base contains modules that are used as a base for extending across the project

app/core contains the unique singleton-like modules that drive the application

app/utils contains helper modules

app/views contains modules that define concrete views, extended from the more abstract app/base/view



# Features

The app/util/layout-watcher Module keeps the body element updated with a class that 
indicates the current bootstrap layout mode (xs/sm/md/lg) to your CSS rules.

page elements - optional data attributes

data-page-title