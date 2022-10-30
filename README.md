## setup

```bash
docker compose up --detach
pnpm i
pnpm dev
```

## commands

query person every 1 second:

```bash
watch -n 1 -x curl -L -X POST 'localhost:3000/graphql' -H 'Content-Type: application/json' --data-raw '{"query":"query Person($id: String!) {\n  person(id: $id) {\n    id\n    firstName\n    lastName\n    fullName\n  }\n}","variables":{"id":"1"}}'
```

trigger cache invalidation:

```bash
curl -L -X POST 'localhost:3000/graphql' -H 'Content-Type: application/json' --data-raw '{"query":"mutation {\n  triggerPermissionsUpdated\n}\n","variables":{}}'
```

print current redis keys:

```bash
docker compose exec -it redis bash -c "redis-cli keys person:*"
```
