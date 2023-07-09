<?php 
include('../conexiones/conexion.php'); 
// para recibir datos de un post: $datos = $_POST['nombre_campo']

        // Cities

		  mysqli_query($mysql, "SET CHARACTER SET utf8");
          $sql_cities="SELECT * FROM `cities`";
          $resultado_cities=mysqli_query($mysql, $sql_cities);

          while($row_cities=mysqli_fetch_array($resultado_cities)){
            $id = $row_cities["id"];
            $country = $row_cities["country"];
            $city = $row_cities["city_name"];
            $university =  $row_cities["university"];
            $location = $row_cities["location"];
            $validators_users = $row_cities["validators_users"];
            $cityNetworks = $row_cities["cityNetworks"];
            $hall_name = $row_cities["hall_name"];
            $hall_email = $row_cities["hall_email"];
            $document = $row_cities["document"];
            $picture = $row_cities["picture"];
            $hidden_city_content = $row_cities["hidden_city_content"];
            $state_region = $row_cities["state_region"];
            $city_description_en = $row_cities["city_description_en"];
            $city_description_local = $row_cities["city_description_local"];


            // Store results into JSON array
            $rows_cities[] = array(
                "id" => $id,
                "country" => $country,
                "city" => $city,
                "university" => $university,
                "location" => $location,
                "validators_users" => $validators_users,
                "cityNetworks" => $cityNetworks,
                "hall_name" => $hall_name,
                "hall_email" => $hall_email,
                "document" => $document,
                "picture" => $picture,
                "hidden_city_content" => $hidden_city_content,
                "state_region" => $state_region,
                "city_description_en" => $city_description_en,
                "city_description_local" => $city_description_local,
            );
        }

        // MANIFESTATIONS

            $sql_manif="select * from manifestations";
            $resultado_manif=mysqli_query($mysql, $sql_manif);
            
            while($row_manif=mysqli_fetch_array($resultado_manif)){
              $id_manif = $row_manif["id"];
              $date_manif = $row_manif["date"];
              $org_pers_information_manif = $row_manif["org_pers_information"];
              $name_manif = $row_manif["manifestation_name"];
              $country_manif = $row_manif["country"];
              $city_manif = $row_manif["city"];
              $city_name_aux_manif = $row_manif["city_name_aux"];
              $location_manif = $row_manif["latitude_longitude"];
              $manifestation_description_manif = $row_manif["manifestation_description"];
              $image_manif = $row_manif["image"];
              $time_manif = $row_manif["time"];
              $type_manif = $row_manif["manifestation_type"];
              $manifestation_actors_manif = $row_manif["manifestation_actors"];
              $photos_manif = $row_manif["photos"];
              $audios_manif = $row_manif["audios"];
              $videos_manif = $row_manif["videos"];
              $maps_manif = $row_manif["maps"];
              $bibliography_manif = $row_manif["bibliography"];
              $other_manif = $row_manif["other"];
              $email_manif = $row_manif["email"];
              $id_user_manif = $row_manif["id_user"];
              $search_manif = $row_manif["search"];
              $protected_no_manif = $row_manif["protected_no"];
              $protected_yes_manif = $row_manif["protected_yes"];
              $protected_unesco_manif = $row_manif["protected_unesco"];
              $protected_others_manif = $row_manif["protected_others"];
              $protected_description_manif = $row_manif["protected_description"];
              $comments_manif = $row_manif["comments"];
              $proposal_manif = $row_manif["proposal"];
              $verified_manif = $row_manif["verified"];
              $links_interest_manif = $row_manif["links_interest"];
              $unesco_items_manif = $row_manif["unesco_items"];
              $unesco_items_intangible_manif = $row_manif["unesco_items_intangible"];
              $tags_manif = $row_manif["tags"];
              $subtype_two_manif = $row_manif["subtype_two"];
              $image_author_manif = $row_manif["image_author"];
              $manifestation_short_description_local_manif = $row_manif["manifestation_short_description_local"];
              $manifestation_description_local_manif = $row_manif["manifestation_description_local"];
              $creation_date_manif = $row_manif["creation_date"];
              $deleted_manif = $row_manif["deleted"];
              $url_friendly_manif = $row_manif["url_friendly"];
              $bibliography_links_manif = $row_manif["bibliography_links"];

              // Store results into JSON array
              $rows_manif[] = array(
                  "id_manif" => $id_manif,
                  "date_manif" => $date_manif,
                  "org_pers_information_manif" => $org_pers_information_manif,
                  "name_manif" => $name_manif,
                  "country_manif" => $country_manif,
                  "city_manif" => $city_manif,
                  "city_name_aux_manif" => $city_name_aux_manif,
                  "location_manif" => $location_manif,
                  "manifestation_description_manif" => $manifestation_description_manif,
                  "image_manif" => $image_manif,
                  "time_manif" => $time_manif,
                  "type_manif" => $type_manif,
                  "manifestation_actors_manif" => $manifestation_actors_manif,
                  "photos_manif" => $photos_manif,
                  "audios_manif" => $audios_manif,
                  "videos_manif" => $videos_manif,
                  "maps_manif" => $maps_manif,
                  "bibliography_manif" => $bibliography_manif,
                  "other_manif" => $other_manif,
                  "email_manif" => $email_manif,
                  "id_user_manif" => $id_user_manif,
                  "search_manif" => $search_manif,
                  "protected_no_manif" => $protected_no_manif,
                  "protected_yes_manif" => $protected_yes_manif,
                  "protected_unesco_manif" => $protected_unesco_manif,
                  "protected_others_manif" => $protected_others_manif,
                  "protected_description_manif" => $protected_description_manif,
                  "comments_manif" => $comments_manif,
                  "proposal_manif" => $proposal_manif,
                  "verified_manif" => $verified_manif,
                  "links_interest_manif" => $links_interest_manif,
                  "unesco_items_manif" => $unesco_items_manif,
                  "unesco_items_intangible_manif" => $unesco_items_intangible_manif,
                  "tags_manif" => $tags_manif,
                  "subtype_two_manif" => $subtype_two_manif,
                  "image_author_manif" => $image_author_manif,
                  "manifestation_short_description_local_manif" => $manifestation_short_description_local_manif,
                  "manifestation_description_local_manif" => $manifestation_description_local_manif,
                  "creation_date_manif" => $creation_date_manif,
                  "deleted_manif" => $deleted_manif,
                  "url_friendly_manif" => $url_friendly_manif,
                  "bibliography_links_manif" => $bibliography_links_manif,
              );
          }

          // Group routes
          $sql_grouprouter="SELECT * FROM `groups_routes`";
          $resultado_grouproutes=mysqli_query($mysql, $sql_grouprouter);

          while($row_group_routes=mysqli_fetch_array($resultado_grouproutes)){
            $id = $row_group_routes["id"];
            $date = $row_group_routes["date"];
            $id_user = $row_group_routes["id_user"];
            $email = $row_group_routes["email"];
            $org_pers_information = $row_group_routes["org_pers_information"];
            $name = $row_group_routes["name"];
            $geo_scope = $row_group_routes["geo_scope"];
            $key_words = $row_group_routes["key_words"];
            $description_en = $row_group_routes["description_en"];
            $dadescription_local = $row_group_routes["description_local"];
            $links_interest_routes = $row_group_routes["links_interest_routes"];
            $group_route = $row_group_routes["group_route"];
            $tags_group = $row_group_routes["tags_group"];
            $country = $row_group_routes["country"];
            $city_id = $row_group_routes["city_id"];
           
            // Store results into JSON array
            $rows_group_routes[] = array(
                "id" => $id,
                "city_id" => $city_id,
                "date" => $date,
                "id_user" => $id_user,
                "email" => $email,
                "org_pers_information" => $org_pers_information,
                "name" => $name,
                "geo_scope" => $geo_scope,
                "key_words" => $key_words,
                "description_en" => $description_en,
                "description_local" => $description_local,
                "links_interest_routes" => $links_interest_routes,
                "group_route" => $group_route,
                "tags_group" => $tags_group,
                "country" => $country,
        );
        }

        // Group routes heritage
        $sql_grouprouterherit="SELECT * FROM `groups_routes_heritage`";
        $resultado_grouproutesherit=mysqli_query($mysql, $sql_grouprouterherit);

        while($row_group_routesherit=mysqli_fetch_array($resultado_grouproutesherit)){
          $id = $row_group_routesherit["id"];
          $group_route_id = $row_group_routesherit["group_route_id"];
          $heritage_id = $row_group_routesherit["heritage_id"];
                
          // Store results into JSON array
          $rows_group_routesherit[] = array(
              "id" => $id,
              "group_route_id" => $group_route_id,
              "heritage_id" => $heritage_id,
                );
      }

         // hierarchies
         $sql_hierar="SELECT * FROM `hierarchies`";
         $resultado_hierar=mysqli_query($mysql, $sql_hierar);
 
         while($row_hierach=mysqli_fetch_array($resultado_hierar)){
           $id = $row_hierach["id"];
           $name = $row_hierach["name"];
           $type = $row_hierach["type"];
           $heritages = $row_hierach["heritages"];
           $country = $row_hierach["country"];
           $description_local = $row_hierach["description_local"];
           $tags = $row_hierach["tags"];
           $links_interest = $row_hierach["links_interest"];
           $date = $row_hierach["date"];
           $id_user = $row_hierach["id_user"];
           $email = $row_hierach["email"];
           $org_pers_information = $row_hierach["org_pers_information"];
           $group_route = $row_hierach["group_route"];
           $description_en = $row_hierach["description_en"];
           $geo_scope = $row_hierach["geo_scope"];
           $key_words = $row_hierach["key_words"];
        

           // Store results into JSON array
           $rows_hierach[] = array(
               "id" => $id,
               "name" => $name,
               "type" => $type,
               "heritages" => $heritages,
               "country" => $country,
               "description_local" => $description_local,
               "tags" => $tags,
               "links_interest" => $links_interest,
               "date" => $date,
               "id_user" => $id_user,
               "email" => $email,
               "org_pers_information" => $org_pers_information,
               "group_route" => $group_route,
               "description_en" => $description_en,
               "geo_scope" => $geo_scope,
               "key_words" => $key_words,
            
                 );
       }
       
         // hierar hierachi
         $sql_hierarhiera="SELECT * FROM `hierar_heritge`";
         $resultado_hierarhiera=mysqli_query($mysql, $sql_hierarhiera);
 
         while($row_hierarhiera=mysqli_fetch_array($resultado_hierarhiera)){
           $id = $row_hierarhiera["id"];
           $hierarchy_id = $row_hierarhiera["hierarchy_id"];
           $heritage_id = $row_hierarhiera["heritage_id"];
                 
           // Store results into JSON array
           $rows_hierarhiera[] = array(
               "id" => $id,
               "hierarchy_id" => $hierarchy_id,
               "heritage_id" => $heritage_id,
                 );
       }
      
        

        $result = [$rows_cities, $rows_manif, $rows_group_routes, $rows_group_routesherit, $rows_hierach, $rows_hierarhiera];

        print_r(json_encode($result));
