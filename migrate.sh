echo "✅ removing existing build.. "
rm -rf ./dist ;

echo "✅ copying files.."
cp -Ri ../clst-client-admin/dist/ .

echo "✅ build copied successfully.."