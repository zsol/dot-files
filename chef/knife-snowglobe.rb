current_dir = File.dirname(__FILE__)
log_level                :info
log_location             STDOUT
node_name                "zsol"
client_key               "#{current_dir}/zsol.pem"
validation_client_name   "snowglobe-validator"
validation_key           "#{current_dir}/snowglobe-validator.pem"
chef_server_url          "https://api.opscode.com/organizations/snowglobe"
cache_type               'BasicFile'
cache_options( :path => "#{ENV['HOME']}/.chef/checksums" )
cookbook_path            ["./cookbooks"]
