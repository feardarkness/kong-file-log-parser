<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [File-log plugin parser (Kong api gateway)](#file-log-plugin-parser-kong-api-gateway)
  - [What you need...](#what-you-need)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# File-log plugin parser (Kong api gateway)

Check your logs easily (node >= 8.x.x).

## What you need...

1. Clone the repo

2. Install dependencies
  ```
  $ npm install
  $ sudo npm install -g http-server
  ```

3. Generate data from the file-logger.
  ```
  $ node index.js
  ```

4. Run the server.
  ```
  $ http-server ./visualize
  ```

5. View the chart XD (http://127.0.0.1:8080)


