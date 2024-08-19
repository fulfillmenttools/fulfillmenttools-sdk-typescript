#!/usr/bin/env bash
set -e
SCRIPTDIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

TARGET_DIR="${SCRIPTDIR}/typescript-fetch-client"
apiUrl="https://raw.githubusercontent.com/fulfillmenttools/fulfillmenttools-api-reference/master/api.swagger.yaml"
openApiVersion="3.0.61"
swaggerFile="swagger-codegen-cli-${openApiVersion}.jar"
localSwaggerFile="${SCRIPTDIR}/${swaggerFile}"
swaggerCodeGenUrl="https://repo1.maven.org/maven2/io/swagger/codegen/v3/swagger-codegen-cli/${openApiVersion}/${swaggerFile}"
apiYamlFile="${SCRIPTDIR}/api.swagger.yaml"

wget -nv -P "${SCRIPTDIR}" -O "${apiYamlFile}" "${apiUrl}"
wget -N -nv -P "${SCRIPTDIR}" "${swaggerCodeGenUrl}"

java -jar "${localSwaggerFile}" generate -i "${apiYamlFile}" -l typescript-fetch -o "${TARGET_DIR}"
cd  "${TARGET_DIR}"
grep -n -A 64 "import \* as url" api.ts | sed -n 's/^\([0-9]\{1,\}\).*/\1d/p' | sed -f - api.ts  > api.tmp
grep -n -A 10000  -B 4 "export const " api.tmp  | sed -n 's/^\([0-9]\{1,\}\).*/\1d/p'  | sed -f - api.tmp > api2.tmp
tail -n +2 api2.tmp > api.ts
rm api2.tmp
rm api.tmp
rm api_test.spec.ts

#Workaround for https://github.com/swagger-api/swagger-codegen/issues/4839
sed -i.bak "s/extends null<String, string> //g" api.ts
sed -i.bak "s/extends null<String, string> //g" api.ts
sed -i.bak "s/ModelObject/any/g" api.ts
sed -i.bak "s/= <any>/=/g" api.ts
rm api.ts.bak

