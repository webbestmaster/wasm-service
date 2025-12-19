# Artillery

## Installation

```bash
$ npm i [-g] artillery
```

## Running

```bash
$ artillery quick --count 20 --num 10 http://localhost:4000/example
```

The `--count` parameter above specifies the total number of _virtual users_,
while `--num` indicates the number of _requests_ that should be made _per user_.
Therefore, 200 (20*10) GET requests are sent to the specified endpoint.
On successful completion of the test, a report is printed out to the console.
